using Flags.Domain.ProductRoot;

namespace Flags.Application.Persistance.Repositories;
public interface IProductRepository
{
    Task<bool> CreateAsync(Product product);
    Task<bool> UpdateAsync(Product product);
    Task<bool> DeleteByIdAsync(Guid id);
    Task<List<Product>> GetAllAsync();
}
