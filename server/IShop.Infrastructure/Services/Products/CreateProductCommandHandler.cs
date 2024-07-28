using IShop.Application.Persistance;
using IShop.Application.Persistance.Repositories;
using IShop.Application.Products.Commands;
using IShop.Domain.ProductRoot;

namespace IShop.Infrastructure.Services.Products;
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
