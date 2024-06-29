using Flags.Application.Common.Persistance;
using Flags.Application.Products.Commands;

namespace Flags.Infrastructure.Services.Products;
public class DeleteProductByIdCommandHandler(IProductRepository productRepository) : IDeleteProductByIdCommandHandler
{
    public async Task<bool> Handle(Guid id, CancellationToken cancellationToken)
    {
        return await productRepository.DeleteByIdAsync(id);
    }
}
