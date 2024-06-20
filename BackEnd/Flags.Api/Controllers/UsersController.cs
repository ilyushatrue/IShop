using ErrorOr;
using Flags.Application.Common.Interfaces.Services.Users;
using Flags.Application.Users.Command;
using Flags.Contracts.Authentication;
using Flags.Domain.Common.Errors;
using Flags.Infrastructure.Authentication;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Flags.Api.Controllers;


[Route("users")]
[Authorize(Policy = CustomPolicies.ADMIN_POLICY)]
public class UsersController(
    IMapper mapper,
    IGetAllUsersQueryHandler getAllUsersQueryHandler,
    IGetUserByIdQueryHandler getUserByIdQueryHandler,
    IEditUserDataCommandHandler editUserDataCommandHandler
) : ApiController
{
    [HttpGet]
    public async Task<IActionResult> GetAllUsersAsync(CancellationToken cancellationToken)
    {
        var result = await getAllUsersQueryHandler.Handle(cancellationToken);

        return result.Match(
            authResult => Ok(result),
            errors => Problem(errors)
        );
    }

    // not used
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserByIdAsync(string id, CancellationToken cancellationToken)
    {
        var result = await getUserByIdQueryHandler.Handle(new(id), cancellationToken);

        return result.Match(
            authResult => Ok(result),
            errors => Problem(errors)
        );
    }

    [AllowAnonymous]
    [HttpGet("current")]
    public IActionResult GetCurrent(CancellationToken cancellationToken)
    {
        throw new Exception("ςϋ υσι");
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

    [HttpPut]
    public async Task<IActionResult> EditUserData([FromBody] EditUserDataCommand user, CancellationToken cancellationToken)
    {
        var result = await editUserDataCommandHandler.Handle(user, cancellationToken);
        var updatedUser = result.Value;
        if (!result.IsError)
        {
            HttpContext.Response.Cookies.Append("user-first-name", updatedUser.FirstName);
            HttpContext.Response.Cookies.Append("user-last-name", updatedUser.LastName);
            HttpContext.Response.Cookies.Append("user-email", updatedUser.Email.Value);
            HttpContext.Response.Cookies.Append("user-phone", updatedUser.Phone.Value);
            HttpContext.Response.Cookies.Append("user-avatar", updatedUser.AvatarId.ToString() ?? "");
        }

        return result.Match(
            ok => Ok(),
            errors => Problem(errors)
        );
    }
}