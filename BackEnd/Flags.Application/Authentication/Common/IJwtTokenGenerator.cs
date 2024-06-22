using Flags.Domain.UserRoot;

namespace Flags.Application.Authentication.Common;
public interface IJwtTokenGenerator
{
    string GenerateAccessToken(User user);
}
