using IShop.Application.Common;
using IShop.Domain.ProductRoot;

namespace IShop.Application.Products.Queries;
public interface IGetProductsByCategoryQueryHandler
{
    Task<Pager<Product>> Handle(GetProductsByCategoryQuery query, CancellationToken cancellationToken);
}
