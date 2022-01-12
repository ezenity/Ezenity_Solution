using System;

namespace Ezenity_QandA.Data.Models
{
  /**
   * This contains all the properties that are needed by the data
   * repository to save a question.
   */
  public class QuestionPostFullRequest
  {
    public string Title { get; set; }
    public string Content { get; set; }
    public string UserId { get; set; }
    public string UserName { get; set; }
    public DateTime Created { get; set; }
  }
}
