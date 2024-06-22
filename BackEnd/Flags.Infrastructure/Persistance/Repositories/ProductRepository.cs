using Flags.Application.Common.Persistance;
using Flags.Domain.ProductRoot;
using Microsoft.EntityFrameworkCore;

namespace Flags.Infrastructure.Persistance.Repositories;

public class ProductRepository(FlagDbContext dbContext) : IProductRepository
{
    public async Task<bool> CreateAsync(Product product)
    {
        dbContext.Products.Add(product);
        var affected = await dbContext.SaveChangesAsync();
        return affected > 0;
    }

    public async Task<List<Product>> GetAllAsync()
    {
        return await dbContext.Products.ToListAsync();
    }
}
