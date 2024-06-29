using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Flags.Api.Controllers;

[ApiController]
[Authorize]
public class ApiController : ControllerBase
{

}