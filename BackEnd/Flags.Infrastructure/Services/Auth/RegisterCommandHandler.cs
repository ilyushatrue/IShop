using Flags.Application.Authentication.Common;
using Flags.Domain.UserRoot.ValueObjects;
using Flags.Domain.UserRoot;
using Flags.Application.Authentication.Commands.Register;
using Flags.Application.AppSettings;
using Microsoft.Extensions.Options;
using Flags.Application.Emails;
using Flags.Domain.Common.Exceptions;
using Flags.Application.Persistance.Repositories;
using Flags.Application.Persistance;

namespace Flags.Infrastructure.Services.Auth;

public class RegisterCommandHandler(
    IUserRepository userRepository,
    IPasswordHasher passwordHasher,
    IEmailSender emailSender,
    IOptions<HostSettings> hostSettings,
    IOptions<AuthenticationSettings> authenticationSettings,
    IDbManager dbManager
) : IRegisterCommandHandler
{
    private readonly HostSettings _hostSettings = hostSettings.Value;
    private readonly AuthenticationSettings _authenticationSettings = authenticationSettings.Value;

    public async Task<bool> Handle(RegisterCommand command, CancellationToken cancellationToken)
    {
        var email = command.Email.Trim();
        if (await userRepository.CheckUserWithEmailExistsAsync(email))
            throw new UniquenessViolationExeption("Эл. почта уже занята.");

        string? phone = null;
        if (!string.IsNullOrWhiteSpace(command.Phone))
        {
            phone = Phone.Trim(command.Phone);
            if (Phone.Validate(phone))
            {
                if (await userRepository.CheckUserWithPhoneExistsAsync(command.Phone.Trim()))
                    throw new UniquenessViolationExeption("Номер телефона уже занят.");
            }
            else
            {
                throw new ValidationException("Некорректный номер телефона");
            }
        }

        var passwordHash = passwordHasher.Generate(command.Password);

        var emailConfirmationTokenExpiry = DateTime.UtcNow.AddHours(_authenticationSettings.EmailConfirmationTokenExpiryHours);

        var user = User.Create(
            id: Guid.NewGuid(),
            firstName: command.FirstName,
            lastName: command.LastName,
            email: email,
            phone: phone,
            passwordHash: passwordHash,
            emailConfirmationTokenExpiry: emailConfirmationTokenExpiry,
            avatarId: command.AvatarId
        );

        userRepository.Create(user);
        var affectedCount = await dbManager.SaveChangesAsync();
        if (affectedCount == 0) return false;

        await emailSender.SendEmailAsync(
            user.Email.Value,
            "Подтверждение эл. почты",
            $"Подтвердите свою электронную почту перейдя по <a href=\"{_hostSettings.Domain}/auth/verify-email/{user.EmailConfirmation!.ConfirmationToken}\">ссылке</a>."
        );
        return true;
    }
}
