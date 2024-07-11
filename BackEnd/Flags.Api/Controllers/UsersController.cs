using Flags.Application.Users.Command;
using Flags.Application.Users.Queries;
using Flags.Contracts.Authentication;
using Flags.Domain.Common.Exceptions;
using Flags.Infrastructure.Authentication;
using Flags.Infrastructure.Services.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Flags.Api.Controllers;

[Route("users")]
[Authorize(Policy = CustomPolicies.ADMIN_POLICY)]
public class UsersController(
    IGetAllUsersQueryHandler getAllUsersQueryHandler,
    IGetUserByIdQueryHandler getUserByIdQueryHandler,
    IEditUserDataCommandHandler editUserDataCommandHandler,
    CookieManager cookieManager
) : ApiController
{
    [HttpGet]
    public async Task<IActionResult> GetAllUsersAsync(CancellationToken cancellationToken)
    {
        var result = await getAllUsersQueryHandler.Handle(cancellationToken);
        return Ok(result);
    }

    //[HttpGet("{id}")]
    //public async Task<IActionResult> GetUserByIdAsync(Guid id, CancellationToken cancellationToken)
    //{
    //    var result = await getUserByIdQueryHandler.Handle(id, cancellationToken);
    //    return Ok(result);
    //}

    [AllowAnonymous]
    [HttpGet("current")]
    public IActionResult GetCurrent()
    {
        if (User.Identity?.IsAuthenticated != true)
            throw new NotAuthenticatedException();

        var (firstName, lastName, phone, email, avatarId) = cookieManager.GetUserCookies();

        var requiredCredentials = new string?[]
        {
            firstName,
            lastName,
            email,
        };

        if (requiredCredentials.Any(x => x is null))
            throw new NotAuthenticatedException();

        Guid? avatarGuid = Guid.TryParse(avatarId, out Guid result) ? result : null;

        var response = new AuthenticationResponse(
            firstName!,
            lastName!,
            email!,
            phone,
            avatarGuid);

        return Ok(response);
    }

    [HttpPut]
    public async Task<IActionResult> EditUserData([FromBody] EditUserDataCommand user, CancellationToken cancellationToken)
    {
        var result = await editUserDataCommandHandler.Handle(user, cancellationToken);
        cookieManager.SetUserCookies(result);
        return Ok();
    }
}