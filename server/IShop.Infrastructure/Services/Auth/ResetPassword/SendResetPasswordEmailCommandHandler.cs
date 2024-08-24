using IShop.Domain.Common.Exceptions;
using Microsoft.Extensions.Options;
using IShop.Application.AppSettings;
using IShop.Application.Persistance.Repositories;
using IShop.Application.Emails;
using IShop.Application.Authentication.Commands.ResetPassword;
using IShop.Domain.UserRoot.ValueObjects;
using IShop.Application.Persistance;
using IShop.Infrastructure.Persistance;
using System.Data;

namespace IShop.Infrastructure.Services.Auth.ResetPassword;
public class SendResetPasswordEmailCommandHandler(
    IDbManager dbManager,
    IUserRepository userRepository,
    IEmailSender emailSender,
    IOptions<HostSettings> hostSettings,
    IOptions<AuthenticationSettings> authenticationSettings) : ISendResetPasswordEmailCommandHandler
{
    private readonly HostSettings _hostSettings = hostSettings.Value;
    private readonly AuthenticationSettings _authenticationSettings = authenticationSettings.Value;

    public async Task Handle(string userEmail, CancellationToken cancellationToken)
    {
        userEmail = userEmail.Trim();
        if (!Email.Validate(userEmail))
            throw new ValidationException(
                "send-reset-password",
                $"Эл. почта {userEmail} не корректна.",
                "Эл. почта не корректна.");

        using var transaction = await dbManager.BeginTransactionAsync(IsolationLevel.RepeatableRead, cancellationToken);
        try
        {
            var user = await userRepository.GetByEmailAsync(userEmail, cancellationToken) ??
                throw new NotFoundException(
                    "send-reset-password",
                    $"Пользователя с email {userEmail} не существует.",
                    "Не удалось отправить сообщение.");

            var emailConfirmationTokenExpiry = DateTime.UtcNow.AddHours(_authenticationSettings.EmailConfirmationTokenExpiryHours);
            user.UpdateEmailConfirmationToken(emailConfirmationTokenExpiry);

            await dbManager.SaveChangesAsync(cancellationToken);
            await transaction.CommitAsync(cancellationToken);

            string url = $"{_hostSettings.Domain}/auth/send-reset-password-form?token={user.EmailConfirmation!.ConfirmationToken}";
            var body = $"Пожалуйста, используйте следующую ссылку для восстановления пароля: <a href=\"{url}\">ссылка</a>";

            await emailSender.SendEmailAsync(userEmail, "Изменение пароля", body);
        }
        catch
        {
            await transaction.RollbackAsync(cancellationToken);
            throw;
        }
    }
}
