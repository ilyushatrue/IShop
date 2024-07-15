﻿using Flags.Application.AppSettings;
using Flags.Application.Authentication.Commands.ConfirmEmail;
using Flags.Application.Emails;
using Flags.Application.Persistance;
using Flags.Application.Persistance.Repositories;
using Flags.Domain.Common.Exceptions;
using Microsoft.Extensions.Options;

namespace Flags.Infrastructure.Services.Auth;
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
