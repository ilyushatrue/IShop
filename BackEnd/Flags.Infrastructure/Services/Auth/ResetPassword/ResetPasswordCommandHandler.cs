using Flags.Application.Authentication.Commands.ResetPassword;
using Flags.Application.Authentication.Common;
using Flags.Application.Persistance;
using Flags.Application.Persistance.Repositories;
using Flags.Domain.Common.Exceptions;
using Flags.Domain.UserRoot.ValueObjects;

namespace Flags.Infrastructure.Services.Auth.ResetPassword;
public class ResetPasswordCommandHandler(
    IUserEmailConfirmationRepository emailConfirmationRepository,
    IDbManager dbManager,
    IPasswordHasher passwordHasher) : IResetPasswordCommandHandler
{
    public async Task<string> Handle(ResetPasswordCommand command)
    {
        if (!Guid.TryParse(command.Token, out Guid guid))
            throw new NotFoundException("Не удалось изменить пароль. Обратитесь к администратору.");

        if (!await emailConfirmationRepository.ValidateTokenAsync(guid))
            throw new NotFoundException("Ссылка не действительна.");

        var emailConfirmation = await emailConfirmationRepository.GetByTokenAsync(guid) ??
            throw new NotFoundException("Не удалось изменить пароль. Обратитесь к администратору.");

        var passwordHash = passwordHasher.Generate(command.NewPassword);
        var newPassword = Password.Create(passwordHash);

        var user = emailConfirmation.User!;

        user.ChangePassword(newPassword);

        emailConfirmation.SetIsConfirmed();

        await dbManager.SaveChangesAsync();

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
