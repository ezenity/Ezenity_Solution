using System.ComponentModel.DataAnnotations;

namespace Ezenity_QandA.Data.Models
{
  /**
   * This class helps Dapper to map to the SQL Parameters.
   */
  public class QuestionPutRequest
  {
    [StringLength(100)]
    public string Title { get; set; }
    public string Content { get; set; }
  }
}
