﻿using IShop.Application.Persistance.Repositories;
using IShop.Domain.ProductRoot.Entities;
using Microsoft.EntityFrameworkCore;

namespace IShop.Infrastructure.Persistance.Repositories;
public class ProductCategoryRepository(AppDbContext dbContext) : IProductCategoryRepository
{
    public void CreateAsync(ProductCategory productCategory)
    {
        dbContext.ProductCategories.Add(productCategory);
    }

    public async Task<List<ProductCategory>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await dbContext.ProductCategories
            .Where(pc => pc.ParentId == null)
            .Include(pc => pc.Children)
            .ToListAsync(cancellationToken);
    }

    public async Task SyncAsync(IEnumerable<ProductCategory> categories, CancellationToken cancellationToken)
    {
        await dbContext.SyncronizeRecordsAsync<ProductCategory, int>(categories, cancellationToken);
    }
}
