using Flags.Domain.UserRoot;

namespace Flags.Application.Authentication.Common;

public record AuthenticationResult(
    User User,
    string JwtAccessToken
);
