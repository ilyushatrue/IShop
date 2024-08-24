using IShop.Domain.Common.Exceptions;
using IShop.Application.Authentication.Commands.ResetPassword;
using IShop.Application.Persistance.Repositories;
using Microsoft.Extensions.Options;
using IShop.Application.AppSettings;

namespace IShop.Infrastructure.Services.Auth.ResetPassword;

public class SendResetPasswordFormCommandHandler(
    IOptions<HostSettings> hostSettings,
    IUserEmailConfirmationRepository emailConfirmationRepository) : ISendResetPasswordFormCommandHandler
{
    private readonly HostSettings _hostSettings = hostSettings.Value;

    public async Task<string> Handle(string token, CancellationToken cancellationToken)
    {
        if (!Guid.TryParse(token, out Guid guid))
            throw new NotFoundException(
                "send-reset-password",
                $"Не удалось спарсить токен {token}",
                "Не удалось изменить пароль. Обратитесь к администратору.");

        if (!await emailConfirmationRepository.ValidateTokenAsync(guid, cancellationToken))
            throw new NotFoundException(
                "send-reset-password",
                $"Токен {token} не прошел валидацию.",
                "Не удалось изменить пароль. Обратитесь к администратору.");

        return $@"
            <!DOCTYPE html>
            <html lang=""ru"">
            <head>
                <meta charset=""UTF-8"">
                <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
                <title>Reset Password</title>
                <style>
                    body {{
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                    }}
                    .container {{
                        background-color: #fff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                        max-width: 400px;
                        width: 100%;
                    }}
                    h2 {{
                        text-align: center;
                        margin-bottom: 20px;
                        color: #333;
                    }}
                    .form-group {{
                        margin-bottom: 15px;
                    }}
                    label {{
                        display: block;
                        margin-bottom: 5px;
                        font-weight: bold;
                    }}
                    input[type=""password""] {{
                        width: 100%;
                        padding: 10px;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                        box-sizing: border-box;
                    }}
                    button {{
                        width: 100%;
                        padding: 10px;
                        background-color: #28a745;
                        color: white;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 16px;
                    }}
                    button:hover {{
                        background-color: #218838;
                    }}
                    #message {{
                        margin-top: 15px;
                        text-align: center;
                        color: red;
                    }}
                </style>
            </head>
            <body>
                <div class=""container"">
                    <h2>Сброс пароля</h2>
                    <form id=""resetPasswordForm"">
                        <div class=""form-group"">
                            <label for=""newPassword"">Новый пароль:</label>
                            <input type=""password"" id=""newPassword"" required />
                        </div>
                        <div class=""form-group"">
                            <label for=""confirmPassword"">Подтвердите пароль:</label>
                            <input type=""password"" id=""confirmPassword"" required />
                        </div>
                        <input type=""hidden"" id=""token"" />
                        <button type=""submit"">Сбросить пароль</button>
                    </form>
                    <p id=""message""></p>
                </div>

                <script>
                    document.getElementById('token').value = new URLSearchParams(window.location.search).get('token');

                    document.getElementById('resetPasswordForm').addEventListener('submit', async function (event) {{
                        event.preventDefault();
                        const token = document.getElementById('token').value;
                        const newPassword = document.getElementById('newPassword').value;
                        const confirmPassword = document.getElementById('confirmPassword').value;
                        const messageElement = document.getElementById('message');

                        if (newPassword !== confirmPassword) {{
                            messageElement.textContent = 'Пароли не совпадают';
                            return;
                        }}

                        try {{
                            const response = await fetch('{_hostSettings.Domain}/auth/reset-password', {{
                                method: 'POST',
                                headers: {{
                                    'Content-Type': 'application/json',
                                }},
                                body: JSON.stringify({{ token, newPassword }}),
                            }});

                            if (response.ok) {{
                                messageElement.textContent = 'Пароль успешно изменен';
                                messageElement.style.color = 'green';
                            }} else {{
                                messageElement.textContent = 'Не удалось изменить пароль';
                            }}
                        }} catch (error) {{
                            messageElement.textContent = 'Произошла ошибка';
                        }}
                    }});
                </script>
            </body>
            </html>";
    }
}
