using ErrorOr;
using Flags.Application.Authentication.Commands.RefreshJwt;
using Flags.Application.Authentication.Common;
using Flags.Application.Users.Queries;
using Flags.Contracts.Authentication;
using Flags.Infrastructure.Authentication;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Flags.Api.Controllers;


[Route("users")]
[Authorize(Policy = CustomPolicies.ADMIN_POLICY)]
public class UsersController(
    ISender mediatr,
    IMapper mapper
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

    [AllowAnonymous]
    [HttpGet("current")]
    public async Task<IActionResult> GetCurrentAsync()
    {
        if (User.Identity?.IsAuthenticated == true)
        {
            var firstName = Request.Cookies["user-first-name"];
            var lastName = Request.Cookies["user-last-name"];
            var phone = Request.Cookies["user-phone"];
            var email = Request.Cookies["user-email"];

            var requiredCredentials = new string?[]
            {
                firstName,
                lastName,
                phone,
                email,
            };

            if (requiredCredentials.Any(x => x is null))
            {
                return Problem(statusCode: 401);
            }
            else
            {
                return Ok(new AuthenticationResponse(firstName!, lastName!, email!, phone!));
            }
        }
        else
        {
            var phone = Request.Cookies["user-phone"];

            if (phone is not null)
            {
                var command = new RefreshJwtCommand(phone);
                ErrorOr<AuthenticationResult> authResult = await mediatr.Send(command);

                return authResult.Match(
                    authResult => Ok(mapper.Map<AuthenticationResponse>(authResult)),
                    errors => Problem(errors));
            }
            else
            {
                return Problem(statusCode: 401);
            }
        }
    }
}