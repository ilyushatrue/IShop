using Flags.Application.Persistance.Repositories;
using Flags.Domain.Common.Exceptions;
using Flags.Domain.ProductRoot;
using Microsoft.EntityFrameworkCore;

namespace Flags.Infrastructure.Persistance.Repositories;

public class ProductRepository(FlagDbContext dbContext) : IProductRepository
{
    public void Create(Product product)
    {
        dbContext.Products.Add(product);
    }

    public async Task DeleteByIdAsync(Guid id)
    {
        var entity = await dbContext.Products.FirstOrDefaultAsync(p => p.Id == id) ??
            throw new NotFoundException("Товара не существует.");
        dbContext.Products.Remove(entity);
    }

    public async Task<List<Product>> GetAllByCategoryAsync(int categoryId)
    {
        return await dbContext.Products
            .Where(p => p.CategoryId == categoryId)
            .Include(p => p.Category)
            .ToListAsync();
    }

    public async Task<List<Product>> GetAllAsync()
    {
        return await dbContext.Products
            .Include(p => p.Category)
            .ToListAsync();
    }

    public void Update(Product product)
    {
        dbContext.Update(product);
    }

    public async Task<Product> GetByIdAsync(Guid id)
    {
        return await dbContext.Products.SingleOrDefaultAsync(x => x.Id == id) ??
            throw new NotFoundException("Товара не существует.");
    }
}
