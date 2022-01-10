using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Ezenity_QandA.Data;
using Ezenity_QandA.Data.Models;

namespace Ezenity_QandA.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class QuestionsController : ControllerBase
  {
    /**
     * class-level variable to hold a reference to the repository
     */
    private readonly IDataRepository _dataRepository;

    /**
     * Initilize the data repository
     */
    public QuestionsController(IDataRepository dataRepository)
    {
      _dataRepository = dataRepository;
    }


  }
}
