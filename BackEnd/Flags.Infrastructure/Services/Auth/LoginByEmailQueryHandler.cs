using ErrorOr;
using Flags.Application.Authentication.Common;
using Flags.Application.Authentication.Queries;
using Flags.Application.Common.Interfaces.Authentication;
using Flags.Application.Common.Interfaces.Persistance;
using Flags.Application.Common.Interfaces.Services.Auth;
using Flags.Domain.Common.Errors;

namespace Flags.Infrastructure.Services.Auth;

public class LoginByEmailQueryHandler(
    IUserRepository userRepository,
    IJwtTokenGenerator jwtTokenGenerator,
    IRefreshJwtRepository refreshJwtRepository,
    IPasswordHasher passwordHasher
) : ILoginByEmailQueryHandler
{
    public async Task<ErrorOr<AuthenticationResult>> Handle(
        LoginByEmailQuery query,
        CancellationToken cancellationToken)
    {
        var user = await userRepository.GetByEmailAsync(query.Email.Trim());

        if (user is null)
            return Errors.Authentication.UserNotFound;

        var passwordsMatch = passwordHasher.Verify(query.Password, user.Password.Value);

        if (!passwordsMatch)
            return Errors.Authentication.InvalidCredentials;

        var jwtAccessToken = jwtTokenGenerator.GenerateAccessToken(user);

        if (user.RefreshJwt is null)
            await refreshJwtRepository.CreateAsync(user.Id);
        else
            await refreshJwtRepository.UpdateAsync(user.RefreshJwt);

        return new AuthenticationResult(user, jwtAccessToken);
    }
}
