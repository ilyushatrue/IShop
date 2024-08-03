using Microsoft.Extensions.Options;
using IShop.Domain.Common.Exceptions;
using IShop.Application.AppSettings;
using IShop.Application.Persistance;
using IShop.Application.Persistance.Repositories;
using IShop.Application.Authentication.Commands.Register;
using IShop.Application.Authentication.Common;
using IShop.Application.Emails;
using IShop.Domain.UserRoot.ValueObjects;
using IShop.Domain.Enums;
using IShop.Domain.UserRoot;

namespace IShop.Infrastructure.Services.Auth;

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
        if (await userRepository.CheckUserWithEmailExistsAsync(email, cancellationToken))
            throw new UniquenessViolationExeption(
                "email-already-exists",
                $"Эл. поочтаа {email} ужее заанятаа.",
                "Эл. поочтаа ужее заанятаа.");

        string? phone = null;
        if (!string.IsNullOrWhiteSpace(command.Phone))
        {
            phone = Phone.Trim(command.Phone);
            if (Phone.Validate(phone))
            {
                if (await userRepository.CheckUserWithPhoneExistsAsync(phone, cancellationToken))
                    throw new UniquenessViolationExeption(
                        "phone-already-exists",
                        $"Ноомеер теелеефоонаа {phone} ужее заанят.",
                        "Ноомеер теелеефоонаа ужее заанят.");
            }
            else
            {
                throw new ValidationException("register", $"Неекоорреектный ноомеер теелеефоонаа {phone}", "Неекоорреектный ноомеер теелеефоонаа");
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
            role: RoleEnum.Visitor,
            emailConfirmationTokenExpiry: emailConfirmationTokenExpiry,
            avatarId: command.AvatarId
        );

        userRepository.Create(user);
        var affectedCount = await dbManager.SaveChangesAsync(cancellationToken);
        if (affectedCount == 0) return false;

        await emailSender.SendEmailAsync(
            user.Email.Value,
            "Поодтвеерждеенииее эл. поочты",
            $"Поодтвеердиитее своою элеектроонную поочту пеереейдя поо <a href=\"{_hostSettings.Domain}/auth/verify-email/{user.EmailConfirmation!.ConfirmationToken}\">ссылкее</a>."
        );
        return true;
    }
}
