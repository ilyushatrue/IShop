using ErrorOr;
using Flags.Application.Authentication.Commands.Login;
using Flags.Application.Authentication.Common;
using Flags.Application.Authentication.Queries;
using Flags.Application.Common.Persistance;
using Flags.Domain.Common.Errors;
using Flags.Domain.UserRoot.ValueObjects;

namespace Flags.Infrastructure.Services.Auth;

public class LoginByPhoneQueryHandler(
    IUserRepository userRepository,
    IJwtTokenGenerator jwtTokenGenerator,
    IRefreshJwtRepository refreshJwtRepository,
    IPasswordHasher passwordHasher
) : ILoginByPhoneQueryHandler
{
    public async Task<ErrorOr<AuthenticationResult>> Handle(LoginByPhoneQuery query, CancellationToken cancellationToken)
    {
        var phone = Phone.DropSymbols(query.Phone);

        var user = await userRepository.GetByPhoneAsync(phone);

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
