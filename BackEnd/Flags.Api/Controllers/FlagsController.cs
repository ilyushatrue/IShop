using Microsoft.AspNetCore.Mvc;

namespace Flags.Api.Controllers;

[Route("[controller]")]
public class FlagsController : ApiController
{
	[HttpGet]
	public IActionResult ListFlags()
	{
		return Ok(Array.Empty<string>());
	}
}