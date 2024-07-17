using Flags.Application.Persistance.Repositories;

namespace Flags.Infrastructure.Persistance.Repositories;
public class UserFavoriteProductRepository(
    AppDbContext dbContext) : IUserFavoriteProductRepository
{
    public void Create(Guid userId, Guid productId)
    {
        dbContext.UserFavoriteProducts.Add(new(userId, productId));
    }

    public void Delete(Guid userId, Guid productId)
    {
        dbContext.UserFavoriteProducts.Remove(new(userId, productId));
    }
}
