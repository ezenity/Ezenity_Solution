using System;

namespace Ezenity_QandA.backend.Data.Models
{
  /**
   * The property names in this class match the fields that have been
   * output from the 'Answer_Get_ByQuestionId' Stored Procedure. This allows
   * Dapper to automatically map the data from the database to this
   * class. The property types have also been carefully chosen so that
   * this Dapper mapping process works.
   * 
   * NOTE:
   * The class does not need to contain properties for all of the fields
   * that are output fro mthe Stored Procedure. Dapper will ignore fields
   * that do not have the corresponding properties in the class.
   */
  public class AnswerGetResponse
  {
    public int AnswerId { get; set; }
    public string Content { get; set; }
    public string UserName { get; set; }
    public DateTime Created { get; set; }
  }
}
