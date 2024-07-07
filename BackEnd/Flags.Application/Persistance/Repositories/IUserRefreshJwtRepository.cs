using Flags.Domain.UserRoot.Entities;

namespace Flags.Application.Persistance.Repositories;

public interface IRefreshJwtRepository
{
    Task<RefreshJwt?> GetByIdAsync(Guid userId);
    Task<int> UpdateAsync(RefreshJwt token);
    Task<int> CreateAsync(RefreshJwt token);
    void DeleteAsync(RefreshJwt token);
}