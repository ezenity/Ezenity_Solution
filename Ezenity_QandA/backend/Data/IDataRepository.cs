using Ezenity_QandA.Data.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Ezenity_QandA.Data
{
  /**
   * This interface  is for the data Repository s othat is can be mocked when we write unit tests
   */
  public interface IDataRepository
  {
    /////////////////////////////////////////// Reading Data ///////////////////////////////////////////
    /**
     * Get all questions avaliable from the database
     */
    IEnumerable<QuestionGetManyResponse> GetQuestions();
    /**
     * Get all questions avaliable from the database with their answers
     */
    IEnumerable<QuestionGetManyResponse> GetQuestionsWithAnswers();
    /**
     * Get questions based off of the search query parameter
     */
    IEnumerable<QuestionGetManyResponse> GetQuestionsBySearch(string search);
    /**
     * Get questions based off of the search, pageNumber and pageSize query parameters
     */
    IEnumerable<QuestionGetManyResponse> GetQuestionsBySearchWithPaging(string search, int pageNumber, int pageSize);
    /**
     * Get all questions that have no answers
     */
    IEnumerable<QuestionGetManyResponse> GetUnansweredQuestions();
    /**
     * Get all questions that have no answers asynchronously. This will return a Task
     * of the type that will eventually be returned.
     */
    Task<IEnumerable<QuestionGetManyResponse>> GetUnansweredQuestionsAsync();
    /**
     * Get a single question based on the question Id. if no question is found
     * with the specific question id, null will return instead
     */
    Task<QuestionGetSingleResponse> GetQuestion(int questionId);
    /**
     * Will check if the specific question id is found in the database, if not 
     * will return a null value
     */
    bool QuestionExists(int questionId);
    /**
     * Gets an answer based off of the answer id and if none is found null will be returned
     */
    AnswerGetResponse GetAnswer(int answerId);

    /////////////////////////////////////////// Writing Data ///////////////////////////////////////////
    /**
     * Add a question to the database
     */
    QuestionGetSingleResponse PostQuestion(QuestionPostFullRequest question);
    /**
     * Change an existing question and overwrite an existing question in the database
     */
    QuestionGetSingleResponse PutQuestion(int questionid, QuestionPutRequest question);
    /**
     * Delete an existing question foudn in the database, based on the question id
     */
    void DeleteQuestion(int questionid);
    /**
     * Add an answer to the database
     */
    AnswerGetResponse PostAnswer(AnswerPostFullRequest answer);
  }
}
