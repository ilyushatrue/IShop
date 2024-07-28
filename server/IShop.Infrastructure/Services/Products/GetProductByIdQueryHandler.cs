using IShop.Application.Persistance.Repositories;
using IShop.Application.Products.Queries;
using IShop.Domain.ProductRoot;

namespace IShop.Infrastructure.Services.Products;
public class GetProductByIdQueryHandler(
    IProductRepository productRepository) : IGetProductByIdQueryHandler
{
    public async Task<Product> Handle(GetProductByIdQuery query, CancellationToken cancellationToken)
    {
        return await productRepository.GetByIdAsync(query.Id, cancellationToken);
    }
}
