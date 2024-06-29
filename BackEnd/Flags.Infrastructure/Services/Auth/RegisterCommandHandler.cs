using Flags.Application.Authentication.Common;
using Flags.Domain.UserRoot.ValueObjects;
using Flags.Domain.UserRoot;
using Flags.Application.Authentication.Commands.Register;
using Flags.Application.Common.Persistance;

namespace Flags.Infrastructure.Services.Auth;

public class RegisterCommandHandler(
    IUserRepository userRepository,
    IRefreshJwtRepository refreshJwtRepository,
    IJwtTokenGenerator jwtTokenGenerator,
    IPasswordHasher passwordHasher
) : IRegisterCommandHandler
{
    public async Task<AuthenticationResult> Handle(RegisterCommand command, CancellationToken cancellationToken)
    {
        var email = Email.Create(command.Email);
        var phone = Phone.Create(command.Phone);

        var passwordHash = passwordHasher.Generate(command.Password);
        var password = Password.Create(passwordHash);

        var user = User.Create(
            id: new Guid(),
            firstName: command.FirstName,
            lastName: command.LastName,
            email: email,
            phone: phone,
            password: password,
            avatarId: command.AvatarId
        );

        await userRepository.AddAsync(user);

        var jwtAccessToken = jwtTokenGenerator.GenerateAccessToken(user);
        await refreshJwtRepository.CreateAsync(user.Id);

        return new AuthenticationResult(user, jwtAccessToken);
    }
}
