using Flags.Application.Common;
using Flags.Application.Persistance;
using Flags.Application.Persistance.Repositories;
using Flags.Application.Products.Queries;
using Flags.Domain.ProductRoot;

namespace Flags.Infrastructure.Services.Products;
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
            pager.CurrentPage,
            pager.PageSize);

        return pager;
    }
}
