using Flags.Application.AppSettings;
using Flags.Application.Authentication.Commands.Login;
using Flags.Application.Authentication.Commands.Logout;
using Flags.Application.Authentication.Commands.RefreshJwt;
using Flags.Application.Authentication.Commands.Register;
using Flags.Application.Authentication.Commands.VerifyEmail;
using Flags.Application.Authentication.Queries;
using Flags.Domain.Common.Exceptions;
using Flags.Infrastructure.Services.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Text;

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
    IOptions<ClientSettings> clientSettings,
    CookieManager cookieManager
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
        cookieManager.SetUserCookies(result.User);
        cookieManager.SetJwtAccessTokenCookie(result.JwtAccessToken);
        return Ok();
    }


    [HttpPost("login-by-email")]
    public async Task<IActionResult> LoginByEmail(LoginByEmailQuery query, CancellationToken cancellationToken)
    {
        var authResult = await loginByEmailQueryHandler.Handle(query, cancellationToken);
        cookieManager.SetUserCookies(authResult.User);
        cookieManager.SetJwtAccessTokenCookie(authResult.JwtAccessToken);
        return Ok();
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout(CancellationToken cancellationToken)
    {
        cookieManager.DeleteJwtAccessTokenCookie();
        var userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "UserId")?.Value;

        if (!Guid.TryParse(userId, out Guid id))
            throw new Exception("Непредвиденная ошибка при выходе из учетной записи. Обратитесь к администратору.");

        await logoutCommandHandler.Handle(id, cancellationToken);
        return Ok();
    }

    [HttpPost("login-by-phone")]
    public async Task<IActionResult> LoginByPhone(LoginByPhoneQuery query, CancellationToken cancellationToken)
    {
        var authResult = await loginByPhoneQueryHandler.Handle(query.Phone, query.Password, cancellationToken);
        cookieManager.SetUserCookies(authResult.User);
        cookieManager.SetJwtAccessTokenCookie(authResult.JwtAccessToken);
        return Ok();
    }

    [HttpGet("verify-email/{userId}")]
    public async Task<IActionResult> VerifyEmail(Guid userId)
    {
        HttpContext.Response.ContentType = "text/html";

        //throw new InvalidUsageException("klsajf;lk");
        var result = await verifyEmailCommandHandler.Handle(userId);

        cookieManager.SetUserCookies(result.User);
        cookieManager.SetJwtAccessTokenCookie(result.JwtAccessToken);

        return Content(
            GenerateHtmlContent(@$"
                <h1>А это успех!</h1>
                <div style=""text-align: start""> 
                    <p>Вы успешно подтвердили электронную почту!</p>
                    <p>Перейдите по <a href={_clientSettings.Domain}/account>ссылке</a>, чтобы попасть в личный кабинет.
                </div>"),
            "text/html", Encoding.UTF8
        );
    }

    private string GenerateHtmlContent(string message)
    {
        return $@"
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
                    {message}
                </div>
            </body>
            </html>";
    }
}
