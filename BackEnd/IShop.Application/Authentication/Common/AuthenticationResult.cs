using IShop.Domain.UserRoot;

namespace IShop.Application.Authentication.Common;

public record AuthenticationResult(
    User User,
    string JwtAccessToken
);
