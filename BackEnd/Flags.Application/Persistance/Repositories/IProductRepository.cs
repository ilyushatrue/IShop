using Flags.Domain.ProductRoot;

namespace Flags.Application.Persistance.Repositories;
public interface IProductRepository
{
    Task<Product> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    void Create(Product product);
    void Update(Product product);
    Task DeleteRangeByIdAsync(Guid[] ids, CancellationToken cancellationToken);
    Task<List<Product>> GetAllAsync(int currentPage, int pageSize, CancellationToken cancellationToken);
    Task<List<Product>> GetListByCategoryAsync(int categoryId, int currentPage, int pageSize, CancellationToken cancellationToken);
}