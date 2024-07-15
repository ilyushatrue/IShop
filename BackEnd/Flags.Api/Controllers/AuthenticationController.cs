using Flags.Api.Common;
using Flags.Application.AppSettings;
using Flags.Application.Authentication.Commands.ConfirmEmail;
using Flags.Application.Authentication.Commands.Logout;
using Flags.Application.Authentication.Commands.RefreshJwt;
using Flags.Application.Authentication.Commands.Register;
using Flags.Application.Authentication.Commands.ResetPassword;
using Flags.Application.Authentication.Queries.Login;
using Flags.Domain.Common.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Text;

namespace Flags.Api.Controllers;

[Route("auth")]
public class AuthenticationController(
    IRegisterCommandHandler registerCommandHandler,
    IRefreshJwtCommandHandler refreshJwtCommandHandler,
    ILoginByPhoneQueryHandler loginByPhoneQueryHandler,
    ILoginByEmailQueryHandler loginByEmailQueryHandler,
    ILogoutCommandHandler logoutCommandHandler,
    IConfirmEmailCommandHandler confirmEmailCommandHandler,
    ISendResetPasswordEmailCommandHandler sendResetPasswordEmailCommandHandler,
    IResetPasswordCommandHandler resetPasswordCommandHandler,
    ISendResetPasswordFormCommandHandler sendResetPasswordFormCommandHandler,
    ISendEmailConfirmEmailCommandHandler sendEmailConfirmEmailCommandHandler,
    IOptions<ClientSettings> clientSettings,
    CookieManager cookieManager
    ) : ApiController
{
    private readonly ClientSettings _clientSettings = clientSettings.Value;

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterCommand command, CancellationToken cancellationToken)
    {
        await registerCommandHandler.Handle(command, cancellationToken);
        return Ok();
    }

    [AllowAnonymous]
    [HttpPost("refresh-jwt")]
    public async Task<IActionResult> RefreshJwt(CancellationToken cancellationToken)
    {
        var email = Request.Cookies["user-email"];

        if (string.IsNullOrWhiteSpace(email))
            throw new NotAuthenticatedException("not-authenticated", "Пользователь не аутентифицирован");

        var result = await refreshJwtCommandHandler.Handle(email, cancellationToken);
        cookieManager.SetUserCookies(result.User);
        cookieManager.SetJwtAccessTokenCookie(result.JwtAccessToken);
        return Ok();
    }

    [AllowAnonymous]
    [HttpPost("login-by-email")]
    public async Task<IActionResult> LoginByEmail(LoginByEmailQuery query, CancellationToken cancellationToken)
    {
        var authResult = await loginByEmailQueryHandler.Handle(query, cancellationToken);
        cookieManager.SetUserCookies(authResult.User);
        cookieManager.SetJwtAccessTokenCookie(authResult.JwtAccessToken);
        return Ok();
    }

    [AllowAnonymous]
    [HttpPost("login-by-phone")]
    public async Task<IActionResult> LoginByPhone(LoginByPhoneQuery query, CancellationToken cancellationToken)
    {
        var authResult = await loginByPhoneQueryHandler.Handle(query.Phone, query.Password, cancellationToken);
        cookieManager.SetUserCookies(authResult.User);
        cookieManager.SetJwtAccessTokenCookie(authResult.JwtAccessToken);
        return Ok();
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout(CancellationToken cancellationToken)
    {
        var userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "UserId")!.Value;

        if (!Guid.TryParse(userId, out Guid id))
            throw new Exception("Непредвиденная ошибка при выходе из учетной записи. Обратитесь к администратору.");

        await logoutCommandHandler.Handle(id, cancellationToken);
        cookieManager.DeleteJwtAccessTokenCookie();
        return Ok();
    }

    [AllowAnonymous]
    [HttpPost("send-reset-password-email")]
    public async Task<IActionResult> SendResetPasswordEmail([FromBody] string email, CancellationToken cancellationToken)
    {
        await sendResetPasswordEmailCommandHandler.Handle(email, cancellationToken);
        return Ok();
    }

    [AllowAnonymous]
    [HttpGet("send-reset-password-form")]
    public async Task<IActionResult> SendResetPasswordForm([FromQuery] string token, CancellationToken cancellationToken)
    {
        var formHtml = await sendResetPasswordFormCommandHandler.Handle(token, cancellationToken);
        return Content(formHtml, "text/html", Encoding.UTF8);
    }

    [AllowAnonymous]
    [HttpGet("send-email-confirm-email")]
    public async Task<IActionResult> SendEmailConfirmEmail([FromQuery] string email, CancellationToken cancellationToken)
    {
        await sendEmailConfirmEmailCommandHandler.Handle(email, cancellationToken);
        return Ok();
    }

    [AllowAnonymous]
    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordCommand command, CancellationToken cancellationToken)
    {
        var responseHtml = await resetPasswordCommandHandler.Handle(command, cancellationToken);
        return Content(responseHtml, "text/html", Encoding.UTF8);
    }

    [AllowAnonymous]
    [HttpGet("verify-email/{emailConfirationToken}")]
    public async Task<IActionResult> VerifyEmail(Guid emailConfirationToken, CancellationToken cancellationToken)
    {
        HttpContext.Response.ContentType = "text/html";

        var result = await confirmEmailCommandHandler.Handle(emailConfirationToken, cancellationToken);

        cookieManager.SetUserCookies(result.User);
        cookieManager.SetJwtAccessTokenCookie(result.JwtAccessToken);

        var responseHtml =
            $@"
            <!DOCTYPE html>
            <html lang=""en"">
            <head>
                <meta charset=""utf-8"" />
                <meta name=""viewport"" content=""width=device-width, initial-scale=1"" />
                <title>Подтверждение электронной почты</title>
                <style>
                    body {{
                        background-color: whitesmoke;
                        font-family: Arial, sans-serif;
                        color: #333;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                    }}
                    .container {{
                        text-align: center;
                        background-color: white;
                        padding: 20px;
                        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                        border-radius: 10px;
                    }}
                    a {{
                        color: #007BFF;
                        text-decoration: none;
                    }}
                    a:hover {{
                        text-decoration: underline;
                    }}
                </style>
            </head>
            <body>
                <div class=""container"">
                    <h1>А это успех!</h1>
                    <div style=""text-align: start""> 
                        <p>Вы успешно подтвердили электронную почту!</p>
                        <p>Перейдите по <a href={_clientSettings.Domain}/account>ссылке</a>, чтобы попасть в личный кабинет.
                    </div>
                </div>
            </body>
            </html>";
        return Content(responseHtml, "text/html", Encoding.UTF8);
    }
}
