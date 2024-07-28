using IShop.Domain.Common.Exceptions;
using IShop.Application.Authentication.Commands.ResetPassword;
using IShop.Application.Authentication.Common;
using IShop.Application.Persistance;
using IShop.Application.Persistance.Repositories;
using IShop.Domain.UserRoot.ValueObjects;

namespace IShop.Infrastructure.Services.Auth.ResetPassword;
public class ResetPasswordCommandHandler(
    IUserEmailConfirmationRepository emailConfirmationRepository,
    IDbManager dbManager,
    IPasswordHasher passwordHasher) : IResetPasswordCommandHandler
{
    public async Task<string> Handle(ResetPasswordCommand command, CancellationToken cancellationToken)
    {
        if (!Guid.TryParse(command.Token, out Guid guid))
            throw new NotFoundException(
                "reset-password",
                $"Не удалось спарсить guid={guid}",
                "Не удалось изменить пароль. Обратитесь к администратору.");

        if (!await emailConfirmationRepository.ValidateTokenAsync(guid, cancellationToken))
            throw new NotFoundException(
                "reset-password",
                "Ссылка не действительна.",
                "Ссылка не действительна.");

        var emailConfirmation = await emailConfirmationRepository.GetByTokenAsync(guid, cancellationToken) ??
            throw new NotFoundException(
                "reset-password",
                $"Email по токену подтверждения {guid} не найден.",
                "Не удалось изменить пароль. Обратитесь к администратору.");

        var passwordHash = passwordHasher.Generate(command.NewPassword);
        var newPassword = Password.Create(passwordHash);

        var user = emailConfirmation.User!;

        user.ChangePassword(newPassword);

        emailConfirmation.SetIsConfirmed();

        await dbManager.SaveChangesAsync(cancellationToken);

        var responseHtml =
            $@"
            <!DOCTYPE html>
            <html lang=""en"">
            <head>
                <meta charset=""utf-8"" />
                <meta name=""viewport"" content=""width=device-width, initial-scale=1"" />
                <title>Password has been changed</title>
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
                        <p>Вы успешно изменили пароль!</p>
                    </div>
                </div>
            </body>
            </html>";
        return responseHtml;
    }
}
