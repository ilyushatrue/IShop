using IShop.Application.Persistance;
using IShop.Application.Persistance.Repositories;
using IShop.Application.Products.Commands;

namespace IShop.Infrastructure.Services.Products;
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
