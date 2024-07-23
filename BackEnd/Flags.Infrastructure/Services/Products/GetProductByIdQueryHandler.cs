using Flags.Application.Persistance.Repositories;
using Flags.Application.Products.Queries;
using Flags.Domain.ProductRoot;

namespace Flags.Infrastructure.Services.Products;
public class GetProductByIdQueryHandler(
    IProductRepository productRepository) : IGetProductByIdQueryHandler
{
    public async Task<Product> Handle(GetProductByIdQuery query, CancellationToken cancellationToken)
    {
        return await productRepository.GetByIdAsync(query.Id, cancellationToken);
    }
}
