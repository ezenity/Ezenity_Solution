using Microsoft.AspNetCore.Authorization;
  
namespace Ezenity_QandA.Authorization
{
  public class MustBeQuestionAuthorRequirement : IAuthorizationRequirement
  {
    public MustBeQuestionAuthorRequirement()
    {
    }
  }
}
