using IShop.Domain.Common.Exceptions;
using IShop.Application.AppSettings;
using IShop.Application.Authentication.Commands.ConfirmEmail;
using IShop.Application.Emails;
using IShop.Application.Persistance;
using IShop.Application.Persistance.Repositories;
using Microsoft.Extensions.Options;

namespace IShop.Infrastructure.Services.Auth;
public class SendEmailConfirmEmailCommandHandler(
    IEmailSender emailSender,
    IOptions<HostSettings> hostSettings,
    IUserRepository userRepository,
    IOptions<AuthenticationSettings> authenticationSettings,
    IDbManager dbManager) : ISendEmailConfirmEmailCommandHandler
{
    private readonly AuthenticationSettings _authenticationSettings = authenticationSettings.Value;
    private readonly HostSettings _hostSettings = hostSettings.Value;

    public async Task<bool> Handle(string email, CancellationToken cancellationToken)
    {
        email = email.Trim();
        var user = await userRepository.GetByEmailAsync(email, cancellationToken) ??
            throw new NotFoundException(
                "send-email-confirm-email",
                $"Пользователя с эл. почтой {email} не существует.",
                "Не удалось отправить сообщение.");

        var emailConfirmationTokenExpiry = DateTime.UtcNow.AddHours(_authenticationSettings.EmailConfirmationTokenExpiryHours);

        user.UpdateEmailConfirmationToken(emailConfirmationTokenExpiry);
        await dbManager.SaveChangesAsync(cancellationToken);

        await emailSender.SendEmailAsync(
            user.Email.Value,
            "Подтверждение эл. почты",
            $"Подтвердите свою электронную почту перейдя по <a href=\"{_hostSettings.Domain}/auth/verify-email/{user.EmailConfirmation!.ConfirmationToken}\">ссылке</a>.");

        return true;
    }
}
