﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Ezenity_QandA.Data;
using Ezenity_QandA.Data.Models;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;
using System.Net.Http;
using System.Text.Json;
using System.Linq;

namespace Ezenity_QandA.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class QuestionsController : ControllerBase
  {
    /**
     * class-level variable to hold a reference to the repository
     */
    private readonly IDataRepository _dataRepository;
    /**
     * Class-level variable to hold a reference to the cache
     */
    private readonly IQuestionCache _cache;
    /**
     * Allows to make a GET HTTP request to the Auth0
     */
    private readonly IHttpClientFactory _clientFactory;
    /**
     * Helps us parse the info into uur 'User' model. This will
     * use the appsettings.json to obtain the Auth0 authority
     * information.
     */
    private readonly string _auth0UserInfo;

    /**
     * Initilize the data repository and question cache
     */
    public QuestionsController(IDataRepository dataRepository, IQuestionCache questionCache, IHttpClientFactory clientFactory, IConfiguration configuration)
    {
      _dataRepository = dataRepository;
      _cache = questionCache;
      _clientFactory = clientFactory;
      _auth0UserInfo = $"{configuration["Auth0:Authority"]}userinfo";
    }

    /**
     * Get an array of all the questions in the database if not parameter
     * is passed in. If a parameter is passed, search for all question with
     * what was passed in. This process is called model binding. If the
     * question has an answer return too.
     */
    [HttpGet]
    public async Task<IEnumerable<QuestionGetManyResponse>> GetQuestions(string search, bool includeAnswers, int page = 1, int pageSize = 20)
    {
      if (string.IsNullOrEmpty(search))
      {
        if (includeAnswers)
        {
          return await _dataRepository.GetQuestionsWithAnswers();
        }
        else
        {
          return await _dataRepository.GetQuestions();
        }
      } 
      else
      {
        return await _dataRepository.GetQuestionsBySearchWithPaging(search, page, pageSize);
      }
    }

    /**
     * Gets all questions that are unanswered and returns the response.
     */
    [HttpGet("unanswered")]
    public async Task<IEnumerable<QuestionGetManyResponse>> GetUnansweredQuestions()
    {
      return await _dataRepository.GetUnansweredQuestionsAsync();
    }

    /**
     * Get a question based on question id. If a question id is not found
     * a HTTP status code 404 will return since the qustion id is null.
     */
    [HttpGet("{questionId}")]
    public async Task<ActionResult<QuestionGetSingleResponse>> GetQuestion(int questionId)
    {
      // Non-Cached GetQuestion(int)
      /*var question = _dataRepository.GetQuestion(questionId);
      if (question == null)
      {
        return NotFound();
      }
      return question;*/

      // Cached GetQuestion(int)
      var question = _cache.Get(questionId);
      if(question == null)
      {
        question = await _dataRepository.GetQuestion(questionId);
        if(question == null)
        {
          return NotFound();
        }
        _cache.Set(question);
      }
      return question;
    }

    /**
     * Add a question to the database. The data in the http request body will be mapped
     * to properties in the instance of the 'QuestionPostRequest' class. we will return
     * a 201 status code wth the question in the response. we will also include a 'Location'
     * HTTP header that contains the path to get the question.
     */
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<QuestionGetSingleResponse>> PostQuestion(QuestionPostRequest questionPostRequest)
    {
      var savedQuestion = await _dataRepository.PostQuestion( new QuestionPostFullRequest {
        Title = questionPostRequest.Title,
        Content = questionPostRequest.Content,
        UserId = User.FindFirst(ClaimTypes.NameIdentifier).Value,
        UserName = await GetUserName(),
        Created = DateTime.UtcNow // TODO - Create identity provider
      });
      return CreatedAtAction(nameof(GetQuestion), new { questionId = savedQuestion.QuestionId }, savedQuestion);
    }

    /**
     * Update an existing question using the PUT request. If the question id is not found a 404 status code will get
     * returned. Once the question id is found we will use the updated question model to update  the question in the
     * database and save it. 
     * 
     * NOTE:
     * By allowing the consumer of the API to submit just the information that needs to be updated makes the API
     * easy to consume. If we want to only update what was exactly change we can use the PATCH request however,
     * this will require additonal resources. such as: NewtonsoftJson NuGet Package. More Info here:
     * https://docs.microsoft.com/en-us/aspnet/core/web-api/jsonpatch?view=aspnetcore-6.0
     */
    [Authorize(Policy = "MustBeQuestionAuthor")]
    [HttpPut("{questionId}")]
    public async Task<ActionResult<QuestionGetSingleResponse>> PutQuestion(int questionId, QuestionPutRequest questionPutRequest)
    {
      var question = await _dataRepository.GetQuestion(questionId);

      if (question == null)
      {
        return NotFound();
      }

      questionPutRequest.Title = string.IsNullOrEmpty(questionPutRequest.Title) ? question.Title : questionPutRequest.Title;
      questionPutRequest.Content = string.IsNullOrEmpty(questionPutRequest.Content) ? question.Content : questionPutRequest.Content;

      var savedQuestion = await _dataRepository.PutQuestion(questionId, questionPutRequest);
      _cache.Remove(savedQuestion.QuestionId);

      return savedQuestion;
    }

    /**
     * Delete a question from the database. The question must match the question id or will return a null value
     */
    [Authorize(Policy = "MustBeQuestionAuthor")]
    [HttpDelete("{questionId}")]
    public async Task<ActionResult> DeleteQuestion(int questionId)
    {
      var question = await _dataRepository.GetQuestion(questionId);

      if(question == null)
      {
        return NotFound();
      }

      await _dataRepository.DeleteQuestion(questionId);
      _cache.Remove(questionId);

      return NoContent();
    }

    /**
     * Post an answer to a question. If the question does not exist then a 404 status code will be returned. If
     * the question does exist the answer will get passed to the data repository to insert into the database. The
     * saved answer is returned from the data repository, which is returned in the response.
     */
    [Authorize]
    [HttpPost("answer")]
    public async Task<ActionResult<AnswerGetResponse>> PostAnswer(AnswerPostRequest answerPostRequest)
    {
      var questionExists = await _dataRepository.QuestionExists(answerPostRequest.QuestionId.Value);

      if (!questionExists)
      {
        return NotFound();
      }

      var savedAnswer = await _dataRepository.PostAnswer( new AnswerPostFullRequest {
        QuestionId = answerPostRequest.QuestionId.Value,
        Content = answerPostRequest.Content,
        UserId = User.FindFirst(ClaimTypes.NameIdentifier).Value,
        UserName = await GetUserName(),
        Created = DateTime.UtcNow // TODO - Create identity provider
      });

      _cache.Remove(answerPostRequest.QuestionId.Value);
      return savedAnswer;
    }

    /**
     * Gets the username from Auth0
     * 
     * Makes a GET HTTP request to the Auth0 user information endpoint with the Authorization HTTP
     * header fro mthe current request to the ASP.NET backend. The HTTP header will contain the
     * access token which will give acecss to the Auth0 endpoint. If the request is successful,
     * the resposne body is parsed into the 'User' model. 
     */
    private async Task<string> GetUserName()
    {
      var request = new HttpRequestMessage(HttpMethod.Get, _auth0UserInfo);
      request.Headers.Add("Authorization", Request.Headers["Authorization"].First());

      var client = _clientFactory.CreateClient();
      var response = await client.SendAsync(request);

      if (response.IsSuccessStatusCode)
      {
        var jsonContent = await response.Content.ReadAsStringAsync();
        var user = JsonSerializer.Deserialize<User>(jsonContent, new JsonSerializerOptions
        {
          PropertyNameCaseInsensitive = true
        });
        return user.Name;
      }
      else
      {
        return "";
      }
    }
  }
}
