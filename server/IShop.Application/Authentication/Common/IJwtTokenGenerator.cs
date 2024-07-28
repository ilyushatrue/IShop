using IShop.Domain.UserRoot;

namespace IShop.Application.Authentication.Common;
public interface IJwtTokenGenerator
{
    string GenerateAccessToken(User user);
}
