using ErrorOr;
using Flags.Application.Authentication.Commands.Login;
using Flags.Application.Authentication.Commands.Logout;
using Flags.Application.Authentication.Commands.RefreshJwt;
using Flags.Application.Authentication.Commands.Register;
using Flags.Application.Authentication.Queries;
using Flags.Domain.Common.Errors;
using Flags.Domain.UserRoot;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Flags.Api.Controllers;

[Route("auth")]
[AllowAnonymous]
public class AuthenticationController(
    IRegisterCommandHandler registerCommandHandler,
    IRefreshJwtCommandHandler refreshJwtCommandHandler,
    ILoginByPhoneQueryHandler loginByPhoneQueryHandler,
    ILoginByEmailQueryHandler loginByEmailQueryHandler,
    ILogoutCommandHandler logoutCommandHandler
    ) : ApiController
{
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterCommand command, CancellationToken cancellationToken)
    {
        var authResult = await registerCommandHandler.Handle(command, cancellationToken);

        if (authResult.IsError && authResult.FirstError == Errors.Authentication.InvalidCredentials)
        {
            return Problem(
                statusCode: StatusCodes.Status401Unauthorized,
                title: authResult.FirstError.Description);
        }

        if (!authResult.IsError)
            SetCookies(authResult.Value.User, authResult.Value.JwtAccessToken);

        return authResult.Match(
            authResult => Ok(),
            errors => Problem(errors)
        );
    }

    [HttpPost("refresh-jwt")]
    public async Task<IActionResult> RefreshJwt(CancellationToken cancellationToken)
    {
        var phone = Request.Cookies["user-phone"];

        if (string.IsNullOrWhiteSpace(phone))
            return Problem(statusCode: StatusCodes.Status401Unauthorized);

        return await refreshJwtCommandHandler
            .Handle(phone, cancellationToken)
            .Then(value => SetCookies(value.User, value.JwtAccessToken))
            .Match(
                value => Ok(),
                errors => Problem(errors));
    }


    [HttpPost("login-by-email")]
    public async Task<IActionResult> LoginByEmail(LoginByEmailQuery query, CancellationToken cancellationToken)
    {
        return await loginByEmailQueryHandler
            .Handle(query, cancellationToken)
            .Then(value => SetCookies(value.User, value.JwtAccessToken))
            .Match(
                authResult => Ok(),
                errors => Problem(errors)
            );
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout(CancellationToken cancellationToken)
    {
        var userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "UserId")?.Value;

        if (userId is null)
            return Problem([Errors.Authentication.UserNotFound]);

        var isIdParsed = Guid.TryParse(userId, out Guid id);
        if (!isIdParsed)
        {
            DeleteJwtAccessTokenCookie();
            return Problem([Errors.Authentication.InvalidCredentials]);
        }
        return await logoutCommandHandler
            .Handle(id, cancellationToken)
            .Then(value => DeleteJwtAccessTokenCookie())
            .Match(
                authResult => Ok(),
                errors => Problem(errors));
    }

    [HttpPost("login-by-phone")]
    public async Task<IActionResult> LoginByPhone(LoginByPhoneQuery query, CancellationToken cancellationToken)
    {
        var authResult = await loginByPhoneQueryHandler.Handle(query, cancellationToken);

        if (!authResult.IsError)
            SetCookies(authResult.Value.User, authResult.Value.JwtAccessToken);

        return authResult.Match(
            authResult => Ok(),
            errors => Problem(errors)
        );
    }

    private void SetCookies(User user, string jwtAccessToken)
    {
        DeleteJwtAccessTokenCookie();
        HttpContext.Response.Cookies.Append("jwt-access-token", jwtAccessToken);
        HttpContext.Response.Cookies.Append("user-first-name", user.FirstName);
        HttpContext.Response.Cookies.Append("user-last-name", user.LastName);
        HttpContext.Response.Cookies.Append("user-email", user.Email.Value);
        HttpContext.Response.Cookies.Append("user-phone", user.Phone.Value);
        HttpContext.Response.Cookies.Append("user-avatar", user.AvatarId.ToString() ?? "");
    }

    private void DeleteJwtAccessTokenCookie()
    {
        HttpContext.Response.Cookies.Delete("jwt-access-token");
    }
}
