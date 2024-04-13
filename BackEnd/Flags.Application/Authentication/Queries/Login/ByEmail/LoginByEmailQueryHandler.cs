using ErrorOr;
using Flags.Application.Authentication.Common;
using Flags.Application.Common.Interfaces.Authentication;
using Flags.Application.Common.Interfaces.Persistance;
using Flags.Domain.Common.Errors;
using MediatR;

namespace Flags.Application.Authentication.Queries.Login.ByEmail;

public class LoginByEmailQueryHandler(
    IUserRepository userRepository,
    IJwtTokenGenerator jwtTokenGenerator,
    IPasswordHasher passwordHasher
) :
    IRequestHandler<LoginByEmailQuery, ErrorOr<AuthenticationResult>>
{
    public async Task<ErrorOr<AuthenticationResult>> Handle(
        LoginByEmailQuery query,
        CancellationToken cancellationToken)
    {
        var user = await userRepository.GetUserByEmailAsync(query.Email.Trim());

        if (user is null)
            return Errors.Authentication.UserNotFound;

        var passwordsMatch = passwordHasher.Verify(query.Password, user.Password.Value);

        if (!passwordsMatch)
            return Errors.Authentication.InvalidCredentials;

        var token = jwtTokenGenerator.GenerateToken(user);

        return new AuthenticationResult(user, token);
    }
}
