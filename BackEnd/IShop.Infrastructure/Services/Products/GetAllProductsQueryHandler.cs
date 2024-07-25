using IShop.Application.Common;
using IShop.Application.Persistance;
using IShop.Application.Persistance.Repositories;
using IShop.Application.Products.Queries;
using IShop.Domain.ProductRoot;

namespace IShop.Infrastructure.Services.Products;
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
            pager.PageSize,
            cancellationToken);

        return pager;
    }
}