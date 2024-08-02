using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IShop.Api.Controllers;

[ApiController]
[Authorize]
[Route("api")]
public class ApiController : ControllerBase
{

}