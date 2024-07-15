using Flags.Application.Common;
using Flags.Application.Persistance;
using Flags.Application.Persistance.Repositories;
using Flags.Application.Products.Queries;
using Flags.Domain.ProductRoot;

namespace Flags.Infrastructure.Services.Products;
public class GetAllProductsQueryHandler(
    IDbManager dbManager,
    IProductRepository productRepository) : IGetAllProductsQueryHandler
{
    public async Task<Pager<Product>> Handle(GetAllProductsQuery query, CancellationToken cancellationToken)
    {
        var recordsCount = await dbManager.CountRecordsAsync<Product>(cancellationToken);

        var pager = new Pager<Product>(
            [],
            recordsCount,
            query.CurrentPage,
            query.PageSize);

        if (recordsCount == 0)
            return pager;

        pager.PageItems = await productRepository.GetAllAsync(
            pager.CurrentPage,
            pager.PageSize);

        return pager;
    }
}