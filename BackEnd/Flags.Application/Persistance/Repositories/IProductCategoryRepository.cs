using Flags.Domain.ProductRoot.Entities;

namespace Flags.Application.Persistance.Repositories;
public interface IProductCategoryRepository
{
    Task<List<ProductCategory>> GetAllAsync();
    void CreateAsync(ProductCategory productCategory);
    Task SyncAsync(IEnumerable<ProductCategory> categories, CancellationToken cancellationToken);
}
