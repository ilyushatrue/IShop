using ErrorOr;
using Flags.Application.Common.Persistance;
using Flags.Application.Products.Commands;
using Flags.Domain.Common.Errors;
using Flags.Domain.ProductRoot;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Flags.Infrastructure.Services.Products;
public class CreateProductCommandHandler(IProductRepository productRepository) : ICreateProductCommandHandler
{
    public async Task<ErrorOr<bool>> Handle(CreateProductCommand command, CancellationToken cancellationToken)
    {
        try
        {

            var product = Product.Create(Guid.NewGuid(), command.Name, command.Price, command.ImageId, command.Description);
            var result = await productRepository.CreateAsync(product);
            return result;
        }
        catch (Exception ex)
        {
            return Errors.App.CancellationRequested;
        }
    }
}
