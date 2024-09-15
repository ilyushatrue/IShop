using IShop.Application.Common;
using IShop.Application.Persistance.Repositories;
using IShop.Application.Products.Queries;
using IShop.Domain.ProductRoot;

namespace IShop.Infrastructure.Services.Products;
public class GetProductsByCategoryQueryHandler(
    IProductRepository productRepository) : IGetProductsByCategoryQueryHandler
{
    public async Task<Pager<Product>> Handle(GetProductsByCategoryQuery query, CancellationToken cancellationToken)
    {
        if (query.CategoryId.HasValue)
        {
            ArgumentOutOfRangeException.ThrowIfNegativeOrZero(query.CategoryId.Value);
        }

        var pager = await productRepository.GetListByCategoryAsync(
            query.CurrentPage,
            query.PageSize,
            query.CategoryId,
            query.Search,
            query.MinPrice,
            query.MaxPrice,
            cancellationToken);

        return pager;
    }
}
