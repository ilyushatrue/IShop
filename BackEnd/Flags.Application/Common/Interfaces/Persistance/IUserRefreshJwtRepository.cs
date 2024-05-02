using Flags.Domain.UserEntity;

namespace Flags.Application.Common.Interfaces.Persistance;

public interface IUserRefreshJwtRepository
{
	Task<User?> GetByToken(string refreshToken);
}