using Flags.Domain.UserRoot.Entities;

namespace Flags.Application.Persistance.Repositories;
public interface IUserFavoriteProductRepository
{
    Task<List<UserFavoriteProduct>> GetUserFavorites(Guid userId, CancellationToken cancellationToken);
    void Create(Guid userId, Guid productId);
    void CreateRange(IEnumerable<UserFavoriteProduct> products);
    void Delete(Guid userId, Guid productId);
}
