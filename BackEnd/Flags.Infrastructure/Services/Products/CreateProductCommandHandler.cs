using ErrorOr;
using Flags.Application.Common.Persistance;
using Flags.Application.Products.Commands;
using Flags.Domain.ProductRoot;

namespace Flags.Infrastructure.Services.Products;
public class CreateProductCommandHandler(IProductRepository productRepository) : ICreateProductCommandHandler
{
    public async Task<ErrorOr<bool>> Handle(CreateProductCommand command, CancellationToken cancellationToken)
    {
        var product = Product.Create(new Guid(), command.Name, command.Price, command.ImageId);
        var result = await productRepository.CreateAsync(product);
        return result;
    }
}
