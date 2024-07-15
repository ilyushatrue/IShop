﻿using Flags.Application.Persistance.Repositories;
using Flags.Domain.ProductRoot.Entities;
using Microsoft.EntityFrameworkCore;

namespace Flags.Infrastructure.Persistance.Repositories;
public class ProductCategoryRepository(AppDbContext dbContext) : IProductCategoryRepository
{
    public void CreateAsync(ProductCategory productCategory)
    {
        dbContext.ProductCategories.Add(productCategory);
    }

    public async Task<List<ProductCategory>> GetAllAsync()
    {
        return await dbContext.ProductCategories
            .Where(pc => pc.ParentId == null)
            .Include(pc => pc.Children)
            .ToListAsync();
    }

    public async Task SyncAsync(IEnumerable<ProductCategory> categories, CancellationToken cancellationToken)
    {
        await dbContext.SyncronizeRecordsAsync<ProductCategory, int>(categories, cancellationToken);
    }
}
