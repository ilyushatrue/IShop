using IShop.Domain.UserRoot.Entities;

namespace IShop.Application.Persistance.Repositories;

public interface IRefreshJwtRepository
{
    Task<RefreshJwt?> GetByIdAsync(Guid userId, CancellationToken cancellationToken);
    void Update(RefreshJwt token);
    void Create(RefreshJwt token);
    void Delete(RefreshJwt token);
}