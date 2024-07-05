using Flags.Application.Authentication.Commands.ResetPassword;
using Flags.Domain.UserRoot.ValueObjects;
using Flags.Domain.Common.Exceptions;
using Flags.Application.Emails;
using Microsoft.Extensions.Options;
using Flags.Application.AppSettings;
using Flags.Application.Persistance.Repositories;

namespace Flags.Infrastructure.Services.Auth.ResetPassword;
public class SendResetPasswordEmailCommandHandler(
    IUserRepository userRepository,
    IEmailSender emailSender,
    IOptions<HostSettings> hostSettings) : ISendResetPasswordEmailCommandHandler
{
    private readonly HostSettings _hostSettings = hostSettings.Value;
    public async Task Handle(string userEmail)
    {
        userEmail = userEmail.Trim();
        if (!Email.Validate(userEmail))
            throw new ValidationException("Эл. почта не корректна.");

        var user = await userRepository.GetByEmailAsync(userEmail) ??
            throw new NotFoundException($"Пользователя с email {userEmail} не существует.");

        string url = $"{_hostSettings.Domain}/auth/send-reset-password-form?token={user.EmailConfirmation!.ConfirmationToken}";
        var body = $"Пожалуйста, используйте следующую ссылку для восстановления пароля: <a href=\"{url}\">ссылка</a>";

        await emailSender.SendEmailAsync(userEmail, "Изменение пароля", body);
    }
}
