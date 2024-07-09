using Flags.Application.Persistance;
using Flags.Application.Persistance.Repositories;
using Flags.Application.Products.Commands;

namespace Flags.Infrastructure.Services.Products;
public class DeleteProductByIdCommandHandler(
    IDbManager dbManager,
    IProductRepository productRepository) : IDeleteProductByIdCommandHandler
{
    public async Task<bool> Handle(Guid id, CancellationToken cancellationToken)
    {
        await productRepository.DeleteByIdAsync(id);
        var result = await dbManager.SaveChangesAsync();
        return result > 0;
    }
}
