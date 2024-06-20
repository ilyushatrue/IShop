using Flags.Domain.UserRoot;

namespace Flags.Application.Common.Interfaces.Authentication;
public interface IJwtTokenGenerator
{
    string GenerateAccessToken(User user);
}
