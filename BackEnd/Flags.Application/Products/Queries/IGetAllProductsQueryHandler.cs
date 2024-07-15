using Flags.Application.Common;
using Flags.Domain.ProductRoot;

namespace Flags.Application.Products.Queries;
public interface IGetAllProductsQueryHandler
{
    Task<Pager<Product>> Handle(GetAllProductsQuery query, CancellationToken cancellationToken);
}
