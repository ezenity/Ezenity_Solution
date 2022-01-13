using Ezenity_QandA.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Ezenity_QandA.Authorization
{
  /**
   * By inheriting the 'AuthorizationHandler' class, I can choose which requirement it is handling as
   * a generic parameter
   */
  public class MustBeQuestionAuthorHandler: AuthorizationHandler<MustBeQuestionAuthorRequirement>
  {
    private readonly IDataRepository _dataRepository;
    private readonly IHttpContextAccessor _httpContextAccessor;

    /**
     * Inject both data repository and the httP context into the class
     */
    public MustBeQuestionAuthorHandler(IDataRepository dataRepository, IHttpContextAccessor httpContextAccessor)
    {
      _dataRepository = dataRepository;
      _httpContextAccessor = httpContextAccessor;
    }

    /**
     * Handles the authorization requirements aschronously 
     * 
     * It will first check if the user is authenticated. The context parameter contains information about the
     * user's identity in an 'Identity' property. If the user is not authenticated, then the context will fail.
     * If the user is authenticated then the 'RouteValues' is a doctionary, which will be used within the 
     * HTTP context request to get access to getting the question ID. The 'RouteValues' contains the controller
     * name, the action method name, and the parameters for the action method. the userid is storedin the name
     * identifier claim. The claim has information about the user from a trusted source. Since the claim is
     * only telling us what the subject is, the User object is populated with the claims by the authentication
     * middleware earlier in the request pipline after it has read the access token. If the question is not found
     * we will pass HTTP status code 404 (not found) rather than 401 (unauthorized). If the question is found it
     * will check if the 'userId' in the request matches the question in the database and return 'Fail' if not.
     * 
     */
    protected async override Task HandleRequirementAsync(AuthorizationHandlerContext context, MustBeQuestionAuthorRequirement requirement)
    {
      if (!context.User.Identity.IsAuthenticated)
      {
        context.Fail();
        return;
      }
      var questionId = _httpContextAccessor.HttpContext.Request.RouteValues["questionid"];
      int questionIdAsInt = Convert.ToInt32(questionId);
      var userId = context.User.FindFirst(ClaimTypes.NameIdentifier).Value;
      var question = await _dataRepository.GetQuestion(questionIdAsInt);
      if(question == null)
      {
        // Let it trrough so the controller can return a 404
        context.Succeed(requirement);
        return;
      }
      if(question.UserId != userId)
      {
        context.Fail();
        return;
      }
      context.Succeed(requirement);

    }
  }
}
