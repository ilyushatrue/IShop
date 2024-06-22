using Flags.Domain.ProductRoot;

namespace Flags.Application.Common.Persistance;
public interface IProductRepository
{
    Task<bool> CreateAsync(Product product);
    Task<List<Product>> GetAllAsync();
}
