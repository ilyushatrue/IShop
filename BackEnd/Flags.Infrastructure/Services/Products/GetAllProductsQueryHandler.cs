using Flags.Application.Persistance.Repositories;
using Flags.Application.Products.Queries;
using Flags.Domain.ProductRoot;

namespace Flags.Infrastructure.Services.Products;
internal class GetAllProductsQueryHandler(IProductRepository productRepository) : IGetAllProductsQueryHandler
{
    public async Task<IEnumerable<Product>> Handle(GetAllProductsQuery query)
    {
        if (query.CategoryId != null)
        {
            return await productRepository.GetAllByCategoryAsync((int)query.CategoryId);
        }
        else
        {
            return await productRepository.GetAllAsync();
        }
    }
}
