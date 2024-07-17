using Flags.Application.Persistance.Repositories;
using Flags.Domain.Common.Exceptions;
using Flags.Domain.ProductRoot;
using Microsoft.EntityFrameworkCore;

namespace Flags.Infrastructure.Persistance.Repositories;

public class ProductRepository(AppDbContext dbContext) : IProductRepository
{
    public void Create(Product product)
    {
        dbContext.Products.Add(product);
    }

    public async Task DeleteRangeByIdAsync(Guid[] ids, CancellationToken cancellationToken)
    {
        List<Product> entities = await dbContext.Products.Where(p => ids.Contains(p.Id)).ToListAsync(cancellationToken);
        if (entities.Count != ids.Length)
        {
            var idsString = string.Join(", ", ids.Select(id => $"id={id}"));
            throw new NotFoundException(
                "product-delete-by-id",
                $"Товаров с {idsString} не существует.",
                "Не удалось удалить выбранные товары.");
        }
        dbContext.Products.RemoveRange(entities);
    }

    public async Task<List<Product>> GetListByCategoryAsync(int categoryId, int currentPage, int pageSize, CancellationToken cancellationToken)
    {
        var offset = (currentPage - 1) * pageSize;

        return await dbContext.Products
            .Where(p => p.CategoryId == categoryId)
            .Skip(offset)
            .Take(pageSize)
            .Include(p => p.Category)
            .ToListAsync(cancellationToken);
    }

    public async Task<List<Product>> GetAllAsync(int currentPage, int pageSize, CancellationToken cancellationToken)
    {
        var offset = (currentPage - 1) * pageSize;

        return await dbContext.Products
            .Skip(offset)
            .Take(pageSize)
            .Include(p => p.Category)
            .ToListAsync(cancellationToken);
    }

    public void Update(Product product)
    {
        dbContext.Update(product);
    }

    public async Task<Product> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await dbContext.Products.SingleOrDefaultAsync(x => x.Id == id, cancellationToken) ??
            throw new NotFoundException(
                "product-get-by-id",
                $"Товара с id={id} не существует.",
                "Товара не существует.");
    }
}
