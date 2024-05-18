using Flags.Application.Users.Queries;
using Flags.Contracts.Authentication;
using Flags.Infrastructure.Authentication;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Flags.Api.Controllers;


[Route("users")]
[Authorize(Policy = CustomPolicies.ADMIN_POLICY)]
public class UsersController(
    ISender mediatr
) : ApiController
{
    [HttpGet]
    public async Task<IActionResult> GetAllUsersAsync()
    {
        var iss = new GetAllUsersQuery();
        var result = await mediatr.Send(iss);

        return result.Match(
            authResult => Ok(result),
            errors => Problem(errors)
        );
    }


    // not used
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserByIdAsync(string id)
    {
        var query = new GetUserByIdQuery(id);
        var result = await mediatr.Send(query);

        return result.Match(
            authResult => Ok(result),
            errors => Problem(errors)
        );
    }

    [HttpGet("current")]
    public async Task<IActionResult> GetCurrentAsync()
    {
        //HttpRequest.
        return Ok("new AuthenticationResponse() { }");
    }
}