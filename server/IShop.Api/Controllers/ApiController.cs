using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IShop.Api.Controllers;

[ApiController]
[Authorize]
public class ApiController : ControllerBase
{

}