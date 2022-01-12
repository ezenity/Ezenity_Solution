using Ezenity_QandA.Data.Models;

namespace Ezenity_QandA.Data
{
  public interface IQuestionCache
  {
    /**
     * Getting an item in the cache
     */
    QuestionGetSingleResponse Get(int questionId);
    /**
     * removing an item in the cache
     */
    void Remove(int questionId);
    /**
     * Updating an item in the cache
     */
    void Set(QuestionGetSingleResponse question);
  }
}
