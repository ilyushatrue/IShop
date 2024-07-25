using IShop.Application.Persistance.Repositories;
using IShop.Domain.UserRoot.Entities;
using IShop.Infrastructure.Persistance;
using Microsoft.EntityFrameworkCore;

namespace IShop.Infrastructure.Persistance.Repositories;
public class UserFavoriteProductRepository(
    AppDbContext dbContext) : IUserFavoriteProductRepository
{
    public void Create(Guid userId, Guid productId)
    {
        dbContext.UserFavoriteProducts.Add(new(userId, productId));
    }

    public void CreateRange(IEnumerable<UserFavoriteProduct> products)
    {
        dbContext.UserFavoriteProducts.AddRange(products);
    }

    public void Delete(Guid userId, Guid productId)
    {
        dbContext.UserFavoriteProducts.Remove(new(userId, productId));
    }

    public async Task<List<UserFavoriteProduct>> GetUserFavorites(Guid userId, CancellationToken cancellationToken)
    {
        return await dbContext.UserFavoriteProducts
            .AsNoTracking()
            .Where(x => x.UserId == userId)
            .ToListAsync(cancellationToken);
    }
}
