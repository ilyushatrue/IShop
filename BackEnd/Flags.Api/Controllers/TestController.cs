using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Flags.Api.Controllers;
[AllowAnonymous]
[Route("test")]
public class TestController() : ApiController
{
}