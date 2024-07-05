using Flags.Application.Persistance.Repositories;
using Flags.Application.Products.Commands;
using Flags.Domain.ProductRoot;

namespace Flags.Infrastructure.Services.Products;
public class CreateProductCommandHandler(IProductRepository productRepository) : ICreateProductCommandHandler
{
    public async Task<bool> Handle(CreateProductCommand command, CancellationToken cancellationToken)
    {
        var product = Product.Create(Guid.NewGuid(), command.Name, command.Price, command.ImageId, command.Description);
        var result = await productRepository.CreateAsync(product);
        return result;
    }
}
