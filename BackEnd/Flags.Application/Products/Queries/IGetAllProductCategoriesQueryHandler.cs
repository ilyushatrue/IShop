using Flags.Domain.ProductRoot.Entities;

namespace Flags.Application.Products.Queries;
public interface IGetAllProductCategoriesQueryHandler
{
    public Task<IEnumerable<ProductCategory>> Handle();
}
