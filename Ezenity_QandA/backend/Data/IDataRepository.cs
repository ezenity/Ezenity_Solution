using Ezenity_QandA.backend.Data.Models;
using System.Collections.Generic;

namespace Ezenity_QandA.backend.Data
{
  /**
   * This interface  is for the data Repository s othat is can be mocked when we write unit tests
   */
  public interface IDataRepository
  {
    IEnumerable<QuestionGetManyResponse> getQuestions();
    IEnumerable<QuestionGetManyResponse> GetQuestionsBySearch(string search);
    IEnumerable<QuestionGetManyResponse> GetUnansweredQuestions();
    QuestionGetSingleResponse GetQuestion(int questionId);
    bool QuestionExists(int questionId);
    AnswerGetResponse GetAnswer(int answerId);
  }
}
