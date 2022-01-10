namespace Ezenity_QandA.Data.Models
{
  /**
   * This class helps Dapper to map to the SQL Parameters.
   */
  public class QuestionPutRequest
  {
    public string Title { get; set; }
    public string Content { get; set; }
  }
}
