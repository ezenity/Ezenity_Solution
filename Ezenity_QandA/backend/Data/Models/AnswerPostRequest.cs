using System;
using System.ComponentModel.DataAnnotations;

namespace Ezenity_QandA.Data.Models
{
  /**
   * This class helps Dapper to map to the SQL Parameters.
   */
  public class AnswerPostRequest
  {
    [Required]
    public int? QuestionId { get; set; }
    [Required]
    public string Content { get; set; }
  }
}
