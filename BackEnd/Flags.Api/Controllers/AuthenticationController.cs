using Flags.Application.Authentication.Commands;
using Flags.Application.Authentication.Queries;
using Flags.Application.Common.Interfaces.Services.Auth;
using Flags.Domain.Common.Errors;
using Flags.Domain.UserRoot;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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

        if (phone is not null)
        {
            var command = new RefreshJwtCommand(phone);
            var authResult = await refreshJwtCommandHandler.Handle(command, cancellationToken);

            if (authResult.IsError)
            {
                return authResult.Match(
                    authResult => Problem(statusCode: 401),
                    errors => Problem(errors)
                );
            }
            else
            {
                SetCookies(authResult.Value.User, authResult.Value.JwtAccessToken);

                return authResult.Match(
                    authResult => Ok(),
                    errors => Problem(errors)
                );
            }
        }
        else
        {
            return Problem(statusCode: 401);
        }
    }


    [HttpPost("login-by-email")]
    public async Task<IActionResult> LoginByEmail(LoginByEmailQuery query, CancellationToken cancellationToken)
    {
        var authResult = await loginByEmailQueryHandler.Handle(query, cancellationToken);

        if (!authResult.IsError)
            SetCookies(authResult.Value.User, authResult.Value.JwtAccessToken);

        return authResult.Match(
            authResult => Ok(),
            errors => Problem(errors)
        );
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout(CancellationToken cancellationToken)
    {
        var userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "UserId")?.Value;

        if (userId is not null)
        {
            var command = new LogoutCommand(Guid.Parse(userId));
            var authResult = await logoutCommandHandler.Handle(command, cancellationToken);
            if (!authResult.IsError) DeleteJwtAccessTokenCookie();

            return authResult.Match(
                authResult => Ok(),
                errors => Problem(errors)
            );
        }
        else
        {
            return Problem(statusCode: 401);
        }
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
