using Flags.Domain.ProductRoot;

namespace Flags.Application.Persistance.Repositories;
public interface IProductRepository
{
    Task<Product> GetByIdAsync(Guid id);
    void Create(Product product);
    void Update(Product product);
    Task DeleteByIdAsync(Guid id);
    Task<List<Product>> GetAllAsync();
    Task<List<Product>> GetAllByCategoryAsync(int categoryId);
}
