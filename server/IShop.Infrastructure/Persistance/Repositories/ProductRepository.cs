using IShop.Domain.Common.Exceptions;
using IShop.Application.Persistance.Repositories;
using IShop.Domain.ProductRoot;
using Microsoft.EntityFrameworkCore;
using IShop.Application.Common;

namespace IShop.Infrastructure.Persistance.Repositories;

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

    public async Task<Pager<Product>> GetListByCategoryAsync(
        int currentPage,
        int pageSize,
        int? categoryId,
        string? search,
        int? minPrice,
        int? maxPrice,
        CancellationToken cancellationToken)
    {
        var offset = (currentPage - 1) * pageSize;

        IQueryable<Product> query = GetProductsQuery(categoryId, search, minPrice, maxPrice);

        var recordsCount = await query
            .CountAsync(cancellationToken);

        var records = await query
            .AsNoTracking()
            .Skip(offset)
            .Take(pageSize)
            .Include(p => p.Category)
            .ToListAsync(cancellationToken);

        var pager = new Pager<Product>(records, recordsCount, currentPage, pageSize);

        return pager;
    }

    private IQueryable<Product> GetProductsQuery(int? categoryId, string? search, int? minPrice, int? maxPrice)
    {
        IQueryable<Product> query = dbContext.Products;

        if (categoryId.HasValue)
        {
            query = query.Where(p => p.CategoryId == categoryId);
        }
        if (minPrice.HasValue)
        {
            query = query.Where(p => p.Price >= minPrice.Value);
        }
        if (maxPrice.HasValue)
        {
            query = query.Where(p => p.Price <= maxPrice.Value);
        }
        if (!string.IsNullOrWhiteSpace(search))
        {
            search = search.ToLower();
            query = query.Where(p =>
                p.Name.ToLower().Contains(search) ||
                (p.Description != null && p.Description.ToLower().Contains(search)));
        }

        return query;
    }

    public async Task<List<Product>> GetAllAsync(int currentPage, int pageSize, string? search, CancellationToken cancellationToken)
    {
        var offset = (currentPage - 1) * pageSize;

        IQueryable<Product> query = dbContext.Products;

        if (!string.IsNullOrEmpty(search))
        {
            search = search.ToLower();
            query = query.Where(p => p.Name.ToLower().Contains(search) || (p.Description != null && p.Description.ToLower().Contains(search)));
        }

        return await query
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
        return await dbContext.Products
            .Where(x => x.Id == id)
            .Include(p => p.Category)
            .SingleOrDefaultAsync(cancellationToken) ??
                throw new NotFoundException(
                    "product-get-by-id",
                    $"Товара с id={id} не существует.",
                    "Товара не существует.");
    }
}
