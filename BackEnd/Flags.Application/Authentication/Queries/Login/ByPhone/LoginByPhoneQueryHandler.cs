using ErrorOr;
using Flags.Application.Authentication.Common;
using Flags.Application.Common.Interfaces.Authentication;
using Flags.Application.Common.Interfaces.Persistance;
using Flags.Domain.Common.Errors;
using Flags.Domain.UserEntity.ValueObjects;
using MediatR;

namespace Flags.Application.Authentication.Queries.Login.ByPhone;

public class LoginByPhoneQueryHandler(
    IUserRepository userRepository,
    IJwtTokenGenerator jwtTokenGenerator,
    IPasswordHasher passwordHasher
) :
    IRequestHandler<LoginByPhoneQuery, ErrorOr<AuthenticationResult>>
{
    public async Task<ErrorOr<AuthenticationResult>> Handle(LoginByPhoneQuery query, CancellationToken cancellationToken)
    {
        var phone = Phone.DropSymbols(query.Phone);

        var user = await userRepository.GetUserByPhoneAsync(phone);

        if (user is null)
            return Errors.Authentication.UserNotFound;

        var passwordsMatch = passwordHasher.Verify(query.Password, user.Password.Value);

        if (!passwordsMatch)
            return Errors.Authentication.InvalidCredentials;

        var jwtAccessToken = jwtTokenGenerator.GenerateAccessToken(user);
        var jwtRefreshToken = jwtTokenGenerator.GenerateRefreshToken();

        return new AuthenticationResult(user, jwtAccessToken, jwtRefreshToken);
    }
}
