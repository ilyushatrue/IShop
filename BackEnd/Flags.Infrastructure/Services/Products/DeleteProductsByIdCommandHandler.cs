using Flags.Application.Persistance;
using Flags.Application.Persistance.Repositories;
using Flags.Application.Products.Commands;

namespace Flags.Infrastructure.Services.Products;
public class DeleteProductsByIdCommandHandler(
    IDbManager dbManager,
    IProductRepository productRepository) : IDeleteProductsByIdCommandHandler
{
    public async Task<bool> Handle(DeleteProductsByIdCommand command, CancellationToken cancellationToken)
    {
        await productRepository.DeleteRangeByIdAsync(command.Ids, cancellationToken);
        var result = await dbManager.SaveChangesAsync(cancellationToken);
        return result > 0;
    }
}
