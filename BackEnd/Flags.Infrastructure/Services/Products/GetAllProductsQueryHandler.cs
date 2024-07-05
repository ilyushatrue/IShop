using Flags.Application.Persistance.Repositories;
using Flags.Application.Products.Queries;
using Flags.Domain.ProductRoot;

namespace Flags.Infrastructure.Services.Products;
internal class GetAllProductsQueryHandler(IProductRepository productRepository) : IGetAllProductsQueryHandler
{
    public async Task<IEnumerable<Product>> Handle(CancellationToken cancellationToken)
    {
        return await productRepository.GetAllAsync();
    }
}
