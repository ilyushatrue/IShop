using Flags.Application.Persistance;
using Flags.Application.Persistance.Repositories;
using Flags.Application.Products.Commands;
using Flags.Domain.ProductRoot;

namespace Flags.Infrastructure.Services.Products;
public class CreateProductCommandHandler(
    IProductRepository productRepository,
    IDbManager dbManager) : ICreateProductCommandHandler
{
    public async Task<bool> Handle(CreateProductCommand command, CancellationToken cancellationToken)
    {
        var product = Product.Create(Guid.NewGuid(), command.Name, command.Price, command.ImageId, command.CategoryId, command.Description);
        productRepository.Create(product);
        var result = await dbManager.SaveChangesAsync(cancellationToken);
        return result > 0;
    }
}
