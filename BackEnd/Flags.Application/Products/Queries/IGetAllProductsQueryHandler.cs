using Flags.Domain.ProductRoot;

namespace Flags.Application.Products.Queries;
public interface IGetAllProductsQueryHandler
{
    Task<IEnumerable<Product>> Handle(GetAllProductsQuery query);
}
