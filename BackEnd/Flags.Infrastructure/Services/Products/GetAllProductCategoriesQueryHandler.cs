using Flags.Application.Persistance.Repositories;
using Flags.Application.Products.Queries;
using Flags.Domain.ProductRoot.Entities;

namespace Flags.Infrastructure.Services.Products;
public class GetAllProductCategoriesQueryHandler(IProductCategoryRepository productCategoryRepository) : IGetAllProductCategoriesQueryHandler
{
    public async Task<IEnumerable<ProductCategory>> Handle()
    {
        return await productCategoryRepository.GetAllAsync();
    }
}
