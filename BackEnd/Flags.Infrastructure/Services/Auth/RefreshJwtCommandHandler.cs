using ErrorOr;
using Flags.Application.Authentication.Common;
using Flags.Domain.Common.Errors;
using Flags.Application.Authentication.Commands.RefreshJwt;
using Flags.Application.Common.Persistance;

namespace Flags.Infrastructure.Services.Auth;

public class RefreshJwtCommandHandler(
    IJwtTokenGenerator jwtTokenGenerator,
    IRefreshJwtRepository refreshJwtRepository,
    IUserRepository userRepository
) : IRefreshJwtCommandHandler
{
    public async Task<ErrorOr<AuthenticationResult>> Handle(RefreshJwtCommand command, CancellationToken cancellationToken)
    {
        var user = await userRepository.GetByPhoneAsync(command.UserPhone);

        if (user?.RefreshJwt is not null)
        {
            var newJwtAccessToken = jwtTokenGenerator.GenerateAccessToken(user);
            if (user.RefreshJwt.ExpiryDatetime <= DateTime.Now.AddMinutes(-1))
            {
                await refreshJwtRepository.UpdateAsync(user.RefreshJwt);
            }
            return new AuthenticationResult(
                user,
                newJwtAccessToken);
        }
        else
        {
            return Errors.Authentication.UserNotFound;
        }
    }
}
