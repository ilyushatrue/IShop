using IShop.Application.Persistance;
using IShop.Application.Persistance.Repositories;
using IShop.Application.Products.Commands;

namespace IShop.Infrastructure.Services.Products;
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
