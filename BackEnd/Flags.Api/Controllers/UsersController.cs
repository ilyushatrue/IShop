using Flags.Application.Users.Command;
using Flags.Application.Users.Queries;
using Flags.Contracts.Authentication;
using Flags.Domain.Common.Exceptions;
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
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var result = await getUserByIdQueryHandler.Handle(id, cancellationToken);
        return Ok(result);
    }

    [AllowAnonymous]
    [HttpGet("current")]
    public IActionResult GetCurrent(CancellationToken cancellationToken)
    {
        if (User.Identity?.IsAuthenticated != true)
            throw new NotAuthenticatedException();

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
            throw new NotAuthenticatedException();

        Guid? avatarGuid = Guid.TryParse(avatarId, out Guid result) ? result : null;

        var response = new AuthenticationResponse(
            firstName!,
            lastName!,
            email!,
            phone!,
            avatarGuid);

        return Ok(response);
    }

    [HttpPut]
    public async Task<IActionResult> EditUserData([FromBody] EditUserDataCommand user, CancellationToken cancellationToken)
    {
        var result = await editUserDataCommandHandler.Handle(user, cancellationToken);

        HttpContext.Response.Cookies.Append("user-first-name", result.FirstName);
        HttpContext.Response.Cookies.Append("user-last-name", result.LastName);
        HttpContext.Response.Cookies.Append("user-email", result.Email.Value);
        HttpContext.Response.Cookies.Append("user-phone", result.Phone.Value);
        HttpContext.Response.Cookies.Append("user-avatar", result.AvatarId.ToString() ?? "");

        return Ok();
    }
}