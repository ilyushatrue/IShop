using Flags.Domain.User.Entities;

namespace Flags.Application.Common.Interfaces.Authentication;
public interface IJwtTokenGenerator
{
    string GenerateToken(User user);
}
