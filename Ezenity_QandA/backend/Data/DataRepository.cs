using Dapper;
using Ezenity_QandA.Data.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Dapper.SqlMapper;

namespace Ezenity_QandA.Data
{
  /**
   * This class will hold all of the methods for interaction with the database
   */
  public class DataRepository : IDataRepository
  {
    /**
     * Class-level private variable which will store the database connection string
     */
    private readonly string _connectionString;

    /**
     * This constructor will use dependency injection to set the value of the
     * connection string from the 'appsettings.json' file. 
     */
    public DataRepository(IConfiguration configuration)
    {
      _connectionString = configuration["ConnectionStrings:DefaultConnection"];
    }

    /////////////////////////////////////////// Reading Data ///////////////////////////////////////////

    /**
     * This method will get a single answer based of fof the answer id.
     * 
     * NOTE:
     * We are implementing a using statement to make a connection to the database
     * to ensure once we are done the connection is disposed properly. We are also
     * using a 'SqlConnection' from the Microsoft SQL client Library because this
     * is what the Dapper library extends.
     * 
     * With Dapper we can use a 'QueryFirstOrDefault' extension method on the 'connection'
     * object to execute the 'Answer_Get_ByAnswerId' Stored Procedure. This is simply done
     * by us passing the 'QuestionGetSingleResponse' into the generic parameter of the
     * 'QueryFirstOrDefault' method. This defines the model class the query results should
     * be stored
     * 
     * Another thing to keep in mind that by passing parameters into Dapper rather than
     * trying to construct the SQL prevents an attacker from attemtping an SQL Injection.
     */
    public AnswerGetResponse GetAnswer(int answerId)
    {
      using (var connection = new SqlConnection(_connectionString))
      {
        connection.Open();
        return connection.QueryFirstOrDefault<AnswerGetResponse>(@"EXEC dbo.Answer_Get_ByAnswerId @Answerid = @AnswerId", new { AnswerId = answerId });
      }
    }

    /**
     * This method will get a single question or will return null of the question is not
     * found. We will also run a second query to get the anaswer
     * 
     * NOTE:
     * We are implementing a using statement to make a connection to the database
     * to ensure once we are done the connection is disposed properly. We are also
     * using a 'SqlConnection' from the Microsoft SQL client Library because this
     * is what the Dapper library extends.
     * 
     * With Dapper we can use a 'QueryFirstOrDefault' extension method on the 'connection'
     * object to execute the 'Question_GetSingle' Stored Procedure as well as use a 'Query'
     * extension method on the connection ojection to execute the 'AnswerGetResponse' Stored
     * Procedure. This is simply done by us passing the 'QuestionGetSingleResponse' and
     * 'AnswerGetResponse' in to the generic parameter of the 'QueryFirstOrDefault' and 'Query
     * method. This defines the model class the query results should be stored
     * 
     * Another thing to keep in mind that by passing parameters into Dapper rather than
     * trying to construct the SQL prevents an attacker from attemtping an SQL Injection.
     */
    public async Task<QuestionGetSingleResponse> GetQuestion(int questionId)
    {
      using (var connection = new SqlConnection(_connectionString))
      {
        await connection.OpenAsync();
        // Executes only two stored procedures in multiple database trips
        /*var question = connection.QueryFirstOrDefault<QuestionGetSingleResponse>(@"EXEC dbo.Question_GetSingle @QuestionId = @QuestionId", new { QuestionId = questionId });
        if (question != null)
        {
          question.Answers = connection.Query<AnswerGetResponse>(@"EXEC dbo.Answer_Get_ByQuestionId @QuestionId = @QuestionId", new { QuestionId = questionId });
        }
        return question;*/
        
        // Executing two stored procedures in a single database round trip
        using(GridReader results = await connection.QueryMultipleAsync(
            @"EXEC dbo.Question_GetSingle @QuestionId = @QuestionId;
              EXEC dbo.Answer_Get_ByQuestionId @QuestionId = @QuestionId",
            new { QuestionId = questionId }))
        {
          var question = (await results.ReadAsync<QuestionGetSingleResponse>()).FirstOrDefault();
          if(question != null)
          {
            question.Answers = (await results.ReadAsync<AnswerGetResponse>()).ToList();
          }
          return question;
        }
      }
    }

    /**
     * This method will get all the questions listed in the database
     * 
     * NOTE:
     * We are implementing a using statement to make a connection to the database
     * to ensure once we are done the connection is disposed properly. We are also
     * using a 'SqlConnection' from the Microsoft SQL client Library because this
     * is what the Dapper library extends.
     * 
     * With Dapper we can use a 'Query' extension method on the 'connection' object
     * to execute the 'Question_GetMany' Stored Procedure. This is simply done by us
     * passing the 'QuestiongetManyResponse' in to the generic parameter of the 
     * 'Query' method. This defines the model class the query results should be stored
     */
    public IEnumerable<QuestionGetManyResponse> GetQuestions()
    {
      using (var connection = new SqlConnection(_connectionString))
      {
        connection.Open();
        return connection.Query<QuestionGetManyResponse>(@"EXEC dbo.Question_GetMany");
      }
    }

    /**
     * Will get all the questions listed in the database and all its answers if any
     * 
     * NOTE:
     * We are implementing a using statement to make a connection to the database
     * to ensure once we are done the connection is disposed properly. We are also
     * using a 'SqlConnection' from the Microsoft SQL client Library because this
     * is what the Dapper library extends.
     * 
     * With Dapper we can use a 'Query' extension method on the 'connection' object
     * to execute the 'Question_GetMany' and 'Answer_Get_ByQuestionId' Stored Procedure.
     * This is simply done by us passing the 'QuestiongetManyResponse' and 'AnswerGetResponse'
     * in to the generic parameter of the 'Query' method. This defines the model class the
     * query results should be stored.
     */
    public IEnumerable<QuestionGetManyResponse> GetQuestionsWithAnswers()
    {
      using(var connection = new SqlConnection(_connectionString))
      {
        connection.Open();
        // Causes n+1 problem
        /*var questions = connection.Query<QuestionGetManyResponse>(@"EXEC dbo.Question_GetMany");
        foreach (var question in questions)
        {
          question.Answers = connection.Query<AnswerGetResponse>(@"EXEC dbo.Answer_Get_ByQuestionId @QuestionId = @QuestionId", new { QuestionId = question.QuestionId }).ToList();
        }
        return questions;*/
        
        // Dapper's multi-mapping feature
        var questionDictionary = new Dictionary<int, QuestionGetManyResponse>();
        return connection.Query<QuestionGetManyResponse, AnswerGetResponse, QuestionGetManyResponse>
          (@"EXEC dbo.Question_GetMany_WithAnswers", map: (q, a) =>
          {
            QuestionGetManyResponse question;
            if(!questionDictionary.TryGetValue(q.QuestionId, out question))
            {
              question = q;
              question.Answers = new List<AnswerGetResponse>();
              questionDictionary.Add(question.QuestionId, question);
            }
            question.Answers.Add(a);
            return question;
          },
          splitOn: "QuestionId"
          ).Distinct().ToList();
      }
    }

    /**
     * This method will get all questions that are pertaining to the search query
     * parameter
     * 
     * NOTE:
     * We are implementing a using statement to make a connection to the database
     * to ensure once we are done the connection is disposed properly. We are also
     * using a 'SqlConnection' from the Microsoft SQL client Library because this
     * is what the Dapper library extends.
     * 
     * With Dapper we can use a 'Query' extension method on the 'connection' object
     * to execute the 'Question_GetMany_BySearch' Stored Procedure and execute a
     * parameterized query. We've used an anonymous object for the parameters to save
     * defining a class for the object. This is simply  done by us passing the
     * 'QuestiongetManyResponse' in to the generic parameter of the 'Query' method.
     * This defines the model class the query results should be stored in.
     * 
     * Another thing to keep in mind that by passing parameters into Dapper rather than
     * trying to construct the SQL prevents an attacker from attemtping an SQL Injection.
     */
    public IEnumerable<QuestionGetManyResponse> GetQuestionsBySearch(string search)
    {
      using (var connection = new SqlConnection(_connectionString))
      {
        connection.Open();
        return connection.Query<QuestionGetManyResponse>(@"EXEC dbo.Question_GetMany_BySearch @Search = @Search", new { Search = search });
      }
    }

    /**
     * Get all the questions that are pertaining to the search, pageNumber and pageSize query parameters
     * 
     * NOTE:
     * We are implementing a using statement to make a connection to the database
     * to ensure once we are done the connection is disposed properly. We are also
     * using a 'SqlConnection' from the Microsoft SQL client Library because this
     * is what the Dapper library extends.
     * 
     * With Dapper we can use a 'Query' extension method on the 'connection' object
     * to execute the 'Question_GetMany_BySearch_WithPaging' Stored Procedure and execute a
     * parameterized query. We've used an anonymous object for the parameters to save
     * defining a class for the object. This is simply  done by us passing the
     * 'QuestiongetManyResponse' in to the generic parameter of the 'Query' method.
     * This defines the model class the query results should be stored in.
     * 
     * Another thing to keep in mind that by passing parameters into Dapper rather than
     * trying to construct the SQL prevents an attacker from attemtping an SQL Injection.
     */
    public IEnumerable<QuestionGetManyResponse> GetQuestionsBySearchWithPaging(string search, int pageNumber, int pageSize)
    {
      using (var connection = new SqlConnection(_connectionString))
      {
        connection.Open();
        var parameters = new
        {
          Search = search,
          PageNumber = pageNumber,
          PageSize = pageSize
        };
        return connection.Query<QuestionGetManyResponse>(@"EXEC dbo.Question_GetMany_BySearch_WithPaging @Search = @Search, @PageNumber = @PageNumber, @PageSize = @PageSize", parameters);
      }
    }

    /**
     * This method will get all the questions that are unanswered listed in the database
     * 
     * NOTE:
     * We are implementing a using statement to make a connection to the database
     * to ensure once we are done the connection is disposed properly. We are also
     * using a 'SqlConnection' from the Microsoft SQL client Library because this
     * is what the Dapper library extends.
     * 
     * With Dapper we can use a 'Query' extension method on the 'connection' object
     * to execute the 'Question_Getunaswered' Stored Procedure. This is simply done by us
     * passing the 'QuestiongetManyResponse' in to the generic parameter of the 
     * 'Query' method. This defines the model class the query results should be stored in.
     */
    public IEnumerable<QuestionGetManyResponse> GetUnansweredQuestions()
    {
      using (var connection = new SqlConnection(_connectionString))
      {
        connection.Open();
        return connection.Query<QuestionGetManyResponse>("EXEC dbo.Question_Getunanswered");
      }
    }

    /**
     * This method will get all the questions that are unanswered listed in the database asynchronously.
     * once the I/O calls in the calling stack, the tread will return back to the thread pool for it
     * may be used again. If any of the I/o call is synchronous, then thread thread will be blocked
     * from returning to the thread pool.
     * 
     * NOTE:
     * We are implementing a using statement to make a connection to the database
     * to ensure once we are done the connection is disposed properly. We are also
     * using a 'SqlConnection' from the Microsoft SQL client Library because this
     * is what the Dapper library extends.
     * 
     * With Dapper we can use a 'Query' extension method on the 'connection' object
     * to execute the 'Question_Getunaswered' Stored Procedure. This is simply done by us
     * passing the 'QuestiongetManyResponse' in to the generic parameter of the 
     * 'Query' method. This defines the model class the query results should be stored in.
     */
    public async Task<IEnumerable<QuestionGetManyResponse>> GetUnansweredQuestionsAsync()
    {
      using (var connection = new SqlConnection(_connectionString))
      {
        await connection.OpenAsync();
        return await connection.QueryAsync<QuestionGetManyResponse>("EXEC dbo.question_GetUnanswered");
      }
    }

    /**
     * This method will check whether a question ecists or not.
     * 
     * NOTE:
     * We are implementing a using statement to make a connection to the database
     * to ensure once we are done the connection is disposed properly. We are also
     * using a 'SqlConnection' from the Microsoft SQL client Library because this
     * is what the Dapper library extends.
     * 
     * With Dapper we can use a 'QueryFirst' extension method on the 'connection' object
     * to execute the 'Question_Exists' Stored Procedure. We are using the 'QueryFirst'
     * method rather then 'QueryFirstOrDefault' method because the Stored Procedure will
     * always return a single record. This is simply done by us passing the 'QuestiongetManyResponse'
     * in to the generic parameter of the 'Query' method. This defines the model class the query
     * results should be stored in.
     */
    public bool QuestionExists(int questionId)
    {
      using (var connection = new SqlConnection(_connectionString))
      {
        connection.Open();
        return connection.QueryFirst<bool>(@"EXEC dbo.Question_Exists @QuestionId = @QuestionId", new { QuestionId = questionId });
      }
    }

    /////////////////////////////////////////// Writing Data //////////////////////////////////////////////
    
    /**
     * Add a new question to the database. By using the 'QueryFirst' Dapper method, the sotred Procedure
     * will return the ID of the new question after inserting it into the datbase table. The method returns
     * the saved question by calling the 'GetQuestion' method with 'questionid', since it was returned
     * from the 'Question_Post' stored procedure.
     */
    public QuestionGetSingleResponse PostQuestion(QuestionPostFullRequest question)
    {
      using(var connection = new SqlConnection(_connectionString))
      {
        connection.Open();
        var questionId = connection.QueryFirst<int>(@"EXEC dbo.Question_Post @Title = @Title, @Content = @Content, @UserId = @UserId, @UserName = @UserName, @Created = @Created", question);
        return GetQuestion(questionId);
      }
    }

    /**
     * Change an existing question in the database. We are using the 'Execute' Dapper method since we are
     * simple executing a Store Procedure and not returning anything.
     */
    public QuestionGetSingleResponse PutQuestion(int questionId, QuestionPutRequest question)
    {
      using(var connection = new SqlConnection(_connectionString))
      {
        connection.Open();
        connection.Execute(@"EXEC dbo.Question_Put @QuestionId = @QuestionId, @Title = @Title, @Content = @Content", new { QuestionId = questionId, question.Title, question.Content });
        return GetQuestion(questionId);
      }
    }

    /**
     * Delete an existing question in the database based off of the question id. We are using the 'Execute'
     * Dapper method since we are simple executing a Store Procedure and not returning anything.
     */
    public void DeleteQuestion(int questionId)
    {
      using(var connection = new SqlConnection(_connectionString)){
        connection.Open();
        connection.Execute(@"EXEC dbo.Question_Delete @QuestionId = @QuestionId", new { QuestionId = questionId});
      }
    }

    /**
     * Add an answer to a question in the database and returns the saved answer. 
     */
    public AnswerGetResponse PostAnswer(AnswerPostFullRequest answer)
    {
      using(var connection = new SqlConnection(_connectionString))
      {
        connection.Open();
        return connection.QueryFirst<AnswerGetResponse>( @"EXEC dbo.Answer_Post @QuestionId = @QuestionId, @Content = @Content, @UserId = @UserId, @UserName = @UserName, @Created = @Created", answer);
      }
    }
  }
}
