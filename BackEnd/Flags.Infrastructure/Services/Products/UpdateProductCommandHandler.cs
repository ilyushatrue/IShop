using Flags.Application.Persistance.Repositories;
using Flags.Application.Products.Commands;
using Flags.Domain.ProductRoot;

namespace Flags.Infrastructure.Services.Products;
public class UpdateProductCommandHandler(IProductRepository productRepository) : IUpdateProductCommandHandler
{
    public async Task<bool> Handle(Product product, CancellationToken cancellationToken)
    {
        return await productRepository.UpdateAsync(product);
    }
}
