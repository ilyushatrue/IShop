using ErrorOr;
using Flags.Application.Users.Queries;
using Flags.Contracts.Authentication;
using Flags.Domain.Common.Errors;
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
        var result = await mediatr.Send(new GetAllUsersQuery());

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
    public IActionResult GetCurrent()
    {
        ErrorOr<AuthenticationResponse> GetUserData()
        {
            if (User.Identity?.IsAuthenticated == true)
            {
                var firstName = Request.Cookies["user-first-name"];
                var lastName = Request.Cookies["user-last-name"];
                var phone = Request.Cookies["user-phone"];
                var email = Request.Cookies["user-email"];
                var avatarId = Request.Cookies["user-avatar"];

                var requiredCredentials = new string?[]
                {
                    firstName,
                    lastName,
                    phone,
                    email,
                };

                if (requiredCredentials.Any(x => x is null))
                {
                    return Errors.User.UserNotAuthenticated;
                }
                else
                {
                    return new AuthenticationResponse(
                        firstName!,
                        lastName!,
                        email!,
                        phone!,
                        avatarId != null ? Guid.Parse(avatarId) : null);
                }
            }
            else
            {
                return Errors.User.UserNotAuthenticated;
            }
        }
        var result = GetUserData();
        return result.Match(
            authResult => Ok(result),
            errors => Problem(errors)
        );
    }
}