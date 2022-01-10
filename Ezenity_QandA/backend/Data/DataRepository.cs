using Microsoft.Extensions.Configuration;
using Dapper;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Ezenity_QandA.backend.Data.Models;

namespace Ezenity_QandA.backend.Data
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
    public QuestionGetSingleResponse GetQuestion(int questionId)
    {
      using (var connection = new SqlConnection(_connectionString))
      {
        connection.Open();
        var question = connection.QueryFirstOrDefault<QuestionGetSingleResponse>(@"EXEC dbo.Question_GetSingle @QuestionId = @QuestionId", new { QuestionId = questionId });
        if (question != null)
        {
          question.Answers = connection.Query<AnswerGetResponse>(@"EXEC dbo.Answer_Get_ByQuestionId @QuestionId = @QuestionId", new { QuestionId = questionId });
        }
        return question;
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
    public IEnumerable<QuestionGetManyResponse> getQuestions()
    {
      using (var connection = new SqlConnection(_connectionString))
      {
        connection.Open();
        return connection.Query<QuestionGetManyResponse>(@"EXEC dbo.Question_GetMany");
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
  }
}
