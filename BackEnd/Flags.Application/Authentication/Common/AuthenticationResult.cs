using Flags.Domain.UserEntity;

namespace Flags.Application.Authentication.Common;

public record AuthenticationResult(
    User User,
    string JwtAccessToken,
    string JwtRefreshToken,
    string JwtRefreshTokenExpiryDatetime
);
