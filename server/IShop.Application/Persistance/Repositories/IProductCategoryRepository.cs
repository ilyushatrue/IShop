﻿using IShop.Domain.ProductRoot.Entities;

namespace IShop.Application.Persistance.Repositories;
public interface IProductCategoryRepository
{
    Task<List<ProductCategory>> GetAllAsync(CancellationToken cancellationToken);
    void CreateAsync(ProductCategory productCategory);
    Task SyncAsync(IEnumerable<ProductCategory> categories, CancellationToken cancellationToken);
}
