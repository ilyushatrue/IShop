using Flags.Application.Authentication.Common;
using Flags.Domain.UserRoot.ValueObjects;
using Flags.Domain.UserRoot;
using Flags.Application.Authentication.Commands.Register;
using Flags.Application.Common.Persistance;
using Flags.Application.AppSettings;
using Microsoft.Extensions.Options;
using Flags.Application.Emails;
using Flags.Domain.Common.Exceptions;

namespace Flags.Infrastructure.Services.Auth;

public class RegisterCommandHandler(
    IUserRepository userRepository,
    IPasswordHasher passwordHasher,
    IEmailSender emailSender,
    IOptions<HostSettings> hostSettings
) : IRegisterCommandHandler
{
    private readonly HostSettings _hostSettings = hostSettings.Value;

    public async Task<bool> Handle(RegisterCommand command, CancellationToken cancellationToken)
    {
        var email = Email.Create(command.Email);
        if (await userRepository.CheckUserWithEmailExistsAsync(email))
            throw new UniquenessViolationExeption("Эл. почта уже занята.");

        var inputPhone = Phone.Trim(command.Phone);
        Phone? phone = null;
        if (Phone.Validate(inputPhone))
        {
            phone = Phone.Create(command.Phone);
            if (await userRepository.CheckUserWithPhoneExistsAsync(phone))
                throw new UniquenessViolationExeption("Номер телефона уже занят.");
        }

        var passwordHash = passwordHasher.Generate(command.Password);
        var password = Password.Create(passwordHash);

        var user = User.Create(
            id: Guid.NewGuid(),
            firstName: command.FirstName,
            lastName: command.LastName,
            email: email,
            phone: phone,
            password: password,
            avatarId: command.AvatarId
        );

        await userRepository.CreateAsync(user);

        await emailSender.SendEmailAsync(
            email.Value,
            "Подтверждение эл. почты",
            $"Подтвердите свою электронную почту перейдя по <a href=\"{_hostSettings.Domain}/auth/verify-email/{user.Id}\">ссылке</a>."
        );

        return true;
    }
}
