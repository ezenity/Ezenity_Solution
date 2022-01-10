using System;

namespace Ezenity_QandA.backend.Data.Models
{
  /**
   * This class helps Dapper to map to the SQL Parameters.
   */
  public class QuestionPostRequest
  {
    public string Title { get; set; }
    public string Content { get; set; }
    public string UserId { get; set; }
    public string UserName { get; set; }
    public DateTime Created { get; set; }
  }
}
