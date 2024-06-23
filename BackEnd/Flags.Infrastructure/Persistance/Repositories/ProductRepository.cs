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

    public async Task<bool> DeleteByIdAsync(Guid id)
    {
        var entity = await dbContext.Products.FirstOrDefaultAsync(p => p.Id == id);
        if (entity is not null)
        {
            dbContext.Products.Remove(entity);
            await dbContext.SaveChangesAsync();
        }
        return true;
    }

    public async Task<List<Product>> GetAllAsync()
    {
        return await dbContext.Products.ToListAsync();
    }

    public async Task<bool> UpdateAsync(Product product)
    {
        dbContext.Update(product);
        await dbContext.SaveChangesAsync();
        return true;
    }
}
