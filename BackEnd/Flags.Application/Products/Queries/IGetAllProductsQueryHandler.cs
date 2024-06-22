using ErrorOr;
using Flags.Domain.ProductRoot;

namespace Flags.Application.Products.Queries;
public interface IGetAllProductsQueryHandler
{
    Task<ErrorOr<IEnumerable<Product>>> Handle(CancellationToken cancellationToken);
}
