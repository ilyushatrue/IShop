using ErrorOr;
using Flags.Application.Common.Persistance;
using Flags.Application.Products.Queries;
using Flags.Domain.ProductRoot;

namespace Flags.Infrastructure.Services.Products;
internal class GetAllProductsQueryHandler(IProductRepository productRepository) : IGetAllProductsQueryHandler
{
    public async Task<ErrorOr<IEnumerable<Product>>> Handle(CancellationToken cancellationToken)
    {
        return await productRepository.GetAllAsync();
    }
}
