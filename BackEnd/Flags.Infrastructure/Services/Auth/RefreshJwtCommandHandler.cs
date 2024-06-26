using ErrorOr;
using Flags.Application.Authentication.Common;
using Flags.Domain.Common.Errors;
using Flags.Application.Authentication.Commands.RefreshJwt;
using Flags.Application.Common.Persistance;
using Flags.Domain.UserRoot.ValueObjects;

namespace Flags.Infrastructure.Services.Auth;

public class RefreshJwtCommandHandler(
    IJwtTokenGenerator jwtTokenGenerator,
    IRefreshJwtRepository refreshJwtRepository,
    IUserRepository userRepository
) : IRefreshJwtCommandHandler
{
    public async Task<ErrorOr<AuthenticationResult>> Handle(string userPhone, CancellationToken cancellationToken)
    {
        userPhone = Phone.Trim(userPhone);
        if (!Phone.Validate(userPhone))
            return Errors.Authentication.InvalidCredentials;

        var user = await userRepository.GetByPhoneAsync(userPhone);
        if (user is null)
            return Errors.Authentication.UserNotFound;

        if (user.RefreshJwt is null)
            return Errors.User.UserNotAuthenticated;

        var newJwtAccessToken = jwtTokenGenerator.GenerateAccessToken(user);

        if (user.RefreshJwt.ExpiryDatetime <= DateTime.Now)
            await refreshJwtRepository.UpdateAsync(user.RefreshJwt);

        return new AuthenticationResult(
            user,
            newJwtAccessToken);
    }
}
