using Flags.Application.Authentication.Common;
using Flags.Domain.UserRoot.ValueObjects;
using Flags.Domain.UserRoot;
using Flags.Application.Authentication.Commands.Register;
using Flags.Application.Common.Persistance;
using Flags.Application.AppSettings;
using Microsoft.Extensions.Options;
using Flags.Application.Emails;
using System.Data.SqlTypes;

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
        var phone = Phone.Create(command.Phone);

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

        await userRepository.AddAsync(user);

        await emailSender.SendEmailAsync(
            email.Value,
            "Подтверждение эл. почты",
            $"Подтвердите свою электронную почту перейдя по <a href=\"{_hostSettings.Domain}/auth/verify-email/{user.Id}\">ссылке</a>."
        );

        return true;
    }
}
