using Ezenity_QandA.Data.Models;

namespace Ezenity_QandA.Data
{
  /**
   * Implementing question endpoint with data caching. This is useful
   * for items that the REST API has full control over. If the REST 
   * API does not have control over the data is it most liekly not worth
   * implementing. If the REST API is distributed across several servers,
   * a solution would be to use distributed cache like 'IDistributedCache
   * in ASP.NET. Memory cache is local to each web server, whereas where
   * the REST API is distributed across serveral servers will have
   * database calls on different servers. This solution is great for 
   * high-traffic REST APIs and well worth considering.
   */
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
