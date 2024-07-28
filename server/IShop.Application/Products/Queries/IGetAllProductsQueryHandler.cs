using IShop.Application.Common;
using IShop.Domain.ProductRoot;

namespace IShop.Application.Products.Queries;
public interface IGetAllProductsQueryHandler
{
    Task<Pager<Product>> Handle(GetAllProductsQuery query, CancellationToken cancellationToken);
}
