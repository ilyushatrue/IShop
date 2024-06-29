using Flags.Application.AppSettings;
using Flags.Application.Authentication.Commands.Login;
using Flags.Application.Authentication.Commands.Logout;
using Flags.Application.Authentication.Commands.RefreshJwt;
using Flags.Application.Authentication.Commands.Register;
using Flags.Application.Authentication.Commands.VerifyEmail;
using Flags.Application.Authentication.Common;
using Flags.Application.Authentication.Queries;
using Flags.Domain.Common.Exceptions;
using Flags.Domain.UserRoot;
using Flags.Infrastructure.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Flags.Api.Controllers;

[Route("auth")]
[AllowAnonymous]
public class AuthenticationController(
    IRegisterCommandHandler registerCommandHandler,
    IRefreshJwtCommandHandler refreshJwtCommandHandler,
    ILoginByPhoneQueryHandler loginByPhoneQueryHandler,
    ILoginByEmailQueryHandler loginByEmailQueryHandler,
    ILogoutCommandHandler logoutCommandHandler,
    IVerifyEmailCommandHandler verifyEmailCommandHandler,
    IJwtTokenGenerator jwtTokenGenerator,
    IOptions<ClientSettings> clientSettings
    ) : ApiController
{
    private readonly ClientSettings _clientSettings = clientSettings.Value;

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterCommand command, CancellationToken cancellationToken)
    {
        await registerCommandHandler.Handle(command, cancellationToken);
        return Ok();
    }

    [HttpPost("refresh-jwt")]
    public async Task<IActionResult> RefreshJwt(CancellationToken cancellationToken)
    {
        var phone = Request.Cookies["user-phone"];

        if (string.IsNullOrWhiteSpace(phone))
            throw new NotAuthenticatedException();

        var result = await refreshJwtCommandHandler.Handle(phone, cancellationToken);
        SetCookies(result.User, result.JwtAccessToken);
        return Ok();
    }


    [HttpPost("login-by-email")]
    public async Task<IActionResult> LoginByEmail(LoginByEmailQuery query, CancellationToken cancellationToken)
    {
        await loginByEmailQueryHandler.Handle(query, cancellationToken);
        return Ok();
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout(CancellationToken cancellationToken)
    {
        DeleteJwtAccessTokenCookie();
        var userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "UserId")?.Value;

        if (!Guid.TryParse(userId, out Guid id))
            throw new Exception("Непредвиденная ошибка при выходе из учетной записи. Обратитесь к администратору.");

        await logoutCommandHandler.Handle(id, cancellationToken);
        return Ok();
    }

    [HttpPost("login-by-phone")]
    public async Task<IActionResult> LoginByPhone(LoginByPhoneQuery query, CancellationToken cancellationToken)
    {
        await loginByPhoneQueryHandler.Handle(query.Phone, query.Password, cancellationToken);
        return Ok();
    }

    [HttpGet("verify-email/{userId}")]
    public async Task<IActionResult> VerifyEmail(Guid userId)
    {
        var result = await verifyEmailCommandHandler.Handle(userId);
        if (result is null)
        {
            return BadRequest(new HtmlString(@"
               <div>не удалось подтвердить эл. почту</div>
           "));
        }

        SetCookies(result.User, result.JwtAccessToken);

        return Ok(new HtmlString($@"
                <div>
                    Вы успешно подтвердили эл. почту!
                    <a href='{_clientSettings.Domain}/account'>ссылке</a>
                </div>
            "));
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
