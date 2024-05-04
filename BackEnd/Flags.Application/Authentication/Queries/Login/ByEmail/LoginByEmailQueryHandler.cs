using ErrorOr;
using Flags.Application.Authentication.Common;
using Flags.Application.Common.Interfaces.Authentication;
using Flags.Application.Common.Interfaces.Persistance;
using Flags.Domain.Common.Errors;
using MediatR;
using Microsoft.AspNetCore.Connections;

namespace Flags.Application.Authentication.Queries.Login.ByEmail;

public class LoginByEmailQueryHandler(
    IUserRepository userRepository,
    IJwtTokenGenerator jwtTokenGenerator,
    IRefreshJwtRepository refreshJwtRepository,
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

        var jwtAccessToken = jwtTokenGenerator.GenerateAccessToken(user);
        await refreshJwtRepository.UpdateAsync(user.RefreshJwt);

        return new AuthenticationResult(user, jwtAccessToken);
    }
}
