using IShop.Application.Persistance.Repositories;
using IShop.Application.Products.Queries;
using IShop.Domain.ProductRoot.Entities;

namespace IShop.Infrastructure.Services.Products;
public class GetAllProductCategoriesQueryHandler(
    IProductCategoryRepository productCategoryRepository) : IGetAllProductCategoriesQueryHandler
{
    public async Task<IEnumerable<ProductCategory>> Handle(CancellationToken cancellationToken)
    {
        var categories = await productCategoryRepository.GetAllAsync(cancellationToken);
        return categories;
    }
}
