using Flags.Infrastructure.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Flags.Api.Controllers;


[Route("test")]
[Authorize(Policy = CustomPolicies.ADMIN_POLICY)]
public class TestController() : ApiController
{
	[HttpGet]
	public async Task<IActionResult> Test()
	{
		await Task.CompletedTask;
		return Ok("test");
	}
}