using Flags.Domain.UserRoot.Entities;

namespace Flags.Application.Common.Interfaces.Persistance;

public interface IUserRefreshJwtRepository
{
	Task<UserRefreshJwt?> GetByTokenAsync(string refreshToken);
}