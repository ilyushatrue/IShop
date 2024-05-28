using ErrorOr;
using Flags.Api.Controllers;
using Flags.Application.Authentication.Commands.Logout;
using Flags.Application.Authentication.Commands.RefreshJwt;
using Flags.Application.Authentication.Commands.Register;
using Flags.Application.Authentication.Common;
using Flags.Application.Authentication.Queries.Login.ByEmail;
using Flags.Application.Authentication.Queries.Login.ByPhone;
using Flags.Contracts.Authentication;
using Flags.Domain.Common.Errors;
using Flags.Domain.UserEntity;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Flags.Api.Controller;

[Route("auth")]
[AllowAnonymous]
public class AuthenticationController(
    ISender mediator,
    IMapper mapper
    ) : ApiController
{
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterCommand command)
    {
        ErrorOr<AuthenticationResult> authResult = await mediator.Send(command);

        if (authResult.IsError && authResult.FirstError == Errors.Authentication.InvalidCredentials)
        {
            return Problem(
                statusCode: StatusCodes.Status401Unauthorized,
                title: authResult.FirstError.Description);
        }

        if (!authResult.IsError)
            SetCookies(authResult.Value.User, authResult.Value.JwtAccessToken);

        return authResult.Match(
            authResult => Ok(mapper.Map<AuthenticationResponse>(authResult)),
            errors => Problem(errors)
        );
    }

    [HttpPost("refresh-jwt")]
    public async Task<IActionResult> RefreshJwt()
    {
       var userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "UserId")?.Value;

       if (userId is not null)
       {
           var command = new RefreshJwtCommand(Guid.Parse(userId));
           ErrorOr<AuthenticationResult> authResult = await mediator.Send(command);

           return authResult.Match(
               authResult => Ok(mapper.Map<AuthenticationResponse>(authResult)),
               errors => Problem(errors)
           );
       }
       else
       {
           return Problem(statusCode: 401);
       }
    }


    [HttpPost("login-by-email")]
    public async Task<IActionResult> LoginByEmail(LoginByEmailQuery query)
    {
        var authResult = await mediator.Send(query);

        if (!authResult.IsError)
            SetCookies(authResult.Value.User, authResult.Value.JwtAccessToken);

        return authResult.Match(
            authResult => Ok(mapper.Map<AuthenticationResponse>(authResult)),
            errors => Problem(errors)
        );
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        var userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "UserId")?.Value;

        if (userId is not null)
        {
            var command = new LogoutCommand(Guid.Parse(userId));
            var authResult = await mediator.Send(command);
            if (!authResult.IsError) DeleteJwtAccessTokenCookie();

            return authResult.Match(
                authResult => Ok(authResult),
                errors => Problem(errors)
            );
        }
        else
        {
            return Problem(statusCode: 401);
        }
    }

    [HttpPost("login-by-phone")]
    public async Task<IActionResult> LoginByPhone(LoginByPhoneQuery query)
    {
        var authResult = await mediator.Send(query);

        if (!authResult.IsError)
            SetCookies(authResult.Value.User, authResult.Value.JwtAccessToken);

        return authResult.Match(
            authResult => Ok(mapper.Map<AuthenticationResponse>(authResult)),
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
    }

    private void DeleteJwtAccessTokenCookie()
    {
        HttpContext.Response.Cookies.Delete("jwt-access-token");
    }
}
