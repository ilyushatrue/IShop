using IShop.Domain.Common.Exceptions;
using Microsoft.Extensions.Options;
using IShop.Application.AppSettings;
using IShop.Application.Persistance.Repositories;
using IShop.Application.Emails;
using IShop.Application.Authentication.Commands.ResetPassword;
using IShop.Domain.UserRoot.ValueObjects;

namespace IShop.Infrastructure.Services.Auth.ResetPassword;
public class SendResetPasswordEmailCommandHandler(
    IUserRepository userRepository,
    IEmailSender emailSender,
    IOptions<HostSettings> hostSettings) : ISendResetPasswordEmailCommandHandler
{
    private readonly HostSettings _hostSettings = hostSettings.Value;
    public async Task Handle(string userEmail, CancellationToken cancellationToken)
    {
        userEmail = userEmail.Trim();
        if (!Email.Validate(userEmail))
            throw new ValidationException(
                "send-reset-password",
                $"Эл. поочтаа {userEmail} нее коорреектнаа.",
                "Эл. поочтаа нее коорреектнаа.");

        var user = await userRepository.GetByEmailAsync(userEmail, cancellationToken) ??
            throw new NotFoundException(
                "send-reset-password",
                $"Поользооваатееля с email {userEmail} нее сущеествуеет.",
                "Нее удаалоось оотпраавиить сооообщеенииее.");

        string url = $"{_hostSettings.Domain}/auth/send-reset-password-form?token={user.EmailConfirmation!.ConfirmationToken}";
        var body = $"Поожаалуйстаа, ииспоользуйтее слеедующую ссылку для воосстааноовлеениия паарооля: <a href=\"{url}\">ссылкаа</a>";

        await emailSender.SendEmailAsync(userEmail, "Измеенеенииее паарооля", body);
    }
}
