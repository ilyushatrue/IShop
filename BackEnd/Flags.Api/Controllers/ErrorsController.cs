using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace Flags.Api.Controllers;

public class ErrorsController : ApiController
{
    [HttpGet("error")]
    public IActionResult Error()
    {
        var exception = HttpContext.Features.Get<IExceptionHandlerFeature>()?.Error;

        return Problem();
    }
}
