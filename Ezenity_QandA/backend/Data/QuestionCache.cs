using Microsoft.Extensions.Caching.Memory;
using Ezenity_QandA.Data.Models;

namespace Ezenity_QandA.Data
{
  public class QuestionCache : IQuestionCache
  {
    private MemoryCache _cache { get; set; }

    /**
     * Constructor that creates an instance of the memory cache.
     * 
     * Cache limit is set to 100 items, which will limit the amount
     * of memory the cache takes up on the web server.
     */
    public QuestionCache()
    {
      _cache = new MemoryCache(new MemoryCacheOptions
      {
        SizeLimit = 100
      });
    }

    /**
     * Expression to give a key for a cache item
     */
    private string GetCacheKey(int questionId) => $"Question-{questionId}";

    /**
     * Get a question from the cache.
     * 
     * If the question does not exist in the cache a null value will be returned.
     */
    public QuestionGetSingleResponse Get(int questionId)
    {
      QuestionGetSingleResponse question;
      _cache.TryGetValue(GetCacheKey(questionId), out question);
      return question;
    }

    /**
     * Add a question to the cache.
     * 
     * when setting the cache value a question size is set so that when there are
     * 100 questions the cache wll start removing questions from the cache.
     */
    public void Set(QuestionGetSingleResponse question)
    {
      var cacheEntryOptions = new MemoryCacheEntryOptions().SetSize(1);
      _cache.Set(GetCacheKey(question.QuestionId), question, cacheEntryOptions);
    }

    /**
     * Remove a question from the cache. If no question Id is found, nothing will
     * happen and no exception is thrown.
     */
    public void Remove(int questionId)
    {
      _cache.Remove(GetCacheKey(questionId));
    }
  }
}
