using Flags.Application.Users.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Flags.Api.Controllers;

[Route("users")]
public class UsersController(
    ISender mediatr
) : ApiController
{
    [HttpGet]
    public async Task<IActionResult> GetAllUsers()
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
    public async Task<IActionResult> GetUserById(string id)
    {
        var query = new GetUserByIdQuery(id);
        var result = await mediatr.Send(query);

        return result.Match(
            authResult => Ok(result),
            errors => Problem(errors)
        );
    }
}