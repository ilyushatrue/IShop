using Flags.Application.Persistance;
using Flags.Application.Persistance.Repositories;
using Flags.Application.Products.Commands;
using Flags.Domain.ProductRoot.Entities;

namespace Flags.Infrastructure.Services.Products;
public class SyncProductCategoriesCommandHandler(
    IDbManager dbManager,
    IProductCategoryRepository productCategoryRepository) : ISyncProductCategoriesCommandHandler
{
    public async Task<bool> Handle(IEnumerable<ProductCategory> categories, CancellationToken cancellationToken)
    {
        await productCategoryRepository.SyncAsync(categories);
        var result = await dbManager.SaveChangesAsync(cancellationToken);
        return result > 0;
    }
}
