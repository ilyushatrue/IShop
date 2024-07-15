using Flags.Application.Persistance;
using Flags.Application.Persistance.Repositories;
using Flags.Application.Products.Commands;

namespace Flags.Infrastructure.Services.Products;
public class SyncProductCategoriesCommandHandler(
    IDbManager dbManager,
    IProductCategoryRepository productCategoryRepository) : ISyncProductCategoriesCommandHandler
{
    public async Task<bool> Handle(SyncProductCategoriesCommand command, CancellationToken cancellationToken)
    {
        await productCategoryRepository.SyncAsync(command.Categories, cancellationToken);
        var result = await dbManager.SaveChangesAsync(cancellationToken);
        return result > 0;
    }
}
