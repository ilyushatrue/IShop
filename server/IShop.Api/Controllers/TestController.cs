using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IShop.Api.Controllers;
[AllowAnonymous]
[Route("test")]
public class TestController() : ApiController
{
}