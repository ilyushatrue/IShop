using Flags.Domain.UserRoot.Entities;

namespace Flags.Application.Common.Interfaces.Persistance;

public interface IRefreshJwtRepository
{
	Task<RefreshJwt?> GetByIdAsync(Guid userId);
	Task<int> UpdateAsync(RefreshJwt token);
	Task<int> CreateAsync(Guid userId);
}