using Flags.Application.Authentication.Commands.ResetPassword;
using Flags.Application.Persistance.Repositories;
using Flags.Domain.Common.Exceptions;

namespace Flags.Infrastructure.Services.Auth.ResetPassword;
public class SendResetPasswordFormCommandHandler(
    IUserEmailConfirmationRepository emailConfirmationRepository) : ISendResetPasswordFormCommandHandler
{
    public async Task<string> Handle(string token)
    {
        if (!Guid.TryParse(token, out Guid guid))
            throw new NotFoundException(
                "send-reset-password",
                $"Не удалось спарсить токен {token}",
                "Не удалось изменить пароль. Обратитесь к администратору.");

        if (!await emailConfirmationRepository.ValidateTokenAsync(guid))
            throw new NotFoundException(
                "send-reset-password",
                $"Токен {token} не прошел валидацию.",
                "Не удалось изменить пароль. Обратитесь к администратору.");

        return $@"
            <!DOCTYPE html>
            <html>
            <head>
                <title>Reset Password</title>
            </head>
            <body>
                <h2>Reset Password</h2>
                <form id=""resetPasswordForm"">
                    <div>
                        <label>New Password:</label>
                        <input type=""password"" id=""newPassword"" required />
                    </div>
                    <div>
                        <label>Confirm Password:</label>
                        <input type=""password"" id=""confirmPassword"" required />
                    </div>
                    <input type=""hidden"" id=""token"" />
                    <button type=""submit"">Reset Password</button>
                </form>
                <p id=""message""></p>

                <script>
                    document.getElementById('token').value = new URLSearchParams(window.location.search).get('token');

                    document.getElementById('resetPasswordForm').addEventListener('submit', async function (event) {{
                        event.preventDefault();
                        const token = document.getElementById('token').value;
                        const newPassword = document.getElementById('newPassword').value;
                        const confirmPassword = document.getElementById('confirmPassword').value;
                        const messageElement = document.getElementById('message');

                        if (newPassword !== confirmPassword) {{
                            messageElement.textContent = 'Passwords do not match';
                            return;
                        }}

                        try {{
                            const response = await fetch('http://localhost:5261/auth/reset-password', {{
                                method: 'POST',
                                headers: {{
                                    'Content-Type': 'application/json',
                                }},
                                body: JSON.stringify({{ token, newPassword }}),
                            }});

                            if (response.ok) {{
                                messageElement.textContent = 'Password successfully updated';
                            }} else {{
                                messageElement.textContent = 'Failed to update password';
                            }}
                        }} catch (error) {{
                            messageElement.textContent = 'An error occurred';
                        }}
                    }});
                </script>
            </body>
            </html>";
    }
}
