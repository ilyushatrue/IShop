using IShop.Domain.ProductRoot.Entities;

namespace IShop.Application.Products.Queries;
public interface IGetAllProductCategoriesQueryHandler
{
    public Task<IEnumerable<ProductCategory>> Handle(CancellationToken cancellationToken);
}
