using IShop.Application.Common;
using IShop.Application.Persistance;
using IShop.Application.Persistance.Repositories;
using IShop.Application.Products.Queries;
using IShop.Domain.ProductRoot;

namespace IShop.Infrastructure.Services.Products;
public class GetProductsByCategoryQueryHandler(
    IDbManager dbManager,
    IProductRepository productRepository) : IGetProductsByCategoryQueryHandler
{
    public async Task<Pager<Product>> Handle(GetProductsByCategoryQuery query, CancellationToken cancellationToken)
    {
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(query.CategoryId);

        var recordsCount = await dbManager.CountRecordsAsync<Product>(
            predicate: p => p.CategoryId == query.CategoryId, cancellationToken);

        var pager = new Pager<Product>(
            [],
            recordsCount,
            query.CurrentPage,
            query.PageSize);

        if (recordsCount == 0)
            return pager;

        pager.PageItems = await productRepository.GetListByCategoryAsync(
            query.CategoryId,
            query.Search,
            pager.CurrentPage,
            pager.PageSize,
            cancellationToken);

        return pager;
    }
}
