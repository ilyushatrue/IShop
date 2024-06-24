using ErrorOr;
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
    public async Task<ErrorOr<AuthenticationResult>> Handle(RegisterCommand command, CancellationToken cancellationToken)
    {
        var errors = new List<Error>();
        var existingUsers = await userRepository.GetAllAsync();
        var existingEmails = existingUsers.Select(x => x.Email.Value).ToArray();
        var existingPhones = existingUsers.Select(x => x.Phone.Value).ToArray();


        var email = Email.Create(command.Email, existingEmails);
        var phone = Phone.Create(command.Phone);

        var passwordHash = passwordHasher.Generate(command.Password);
        var password = Password.Create(passwordHash);

        if (email.IsError)
            errors.AddRange(email.Errors);
        if (phone.IsError)
            errors.AddRange(phone.Errors);
        if (password.IsError)
            errors.AddRange(password.Errors);
        if (errors.Count > 0)
            return errors;

        var user = User.Create(
            id: new Guid(),
            firstName: command.FirstName,
            lastName: command.LastName,
            email: email.Value,
            phone: phone.Value,
            password: password.Value,
            avatarId: command.AvatarId
        );

        await userRepository.AddAsync(user);

        var jwtAccessToken = jwtTokenGenerator.GenerateAccessToken(user);
        await refreshJwtRepository.CreateAsync(user.Id);

        return new AuthenticationResult(user, jwtAccessToken);
    }
}
