using Flags.Domain.ProductRoot;

namespace Flags.Application.Products.Queries;
public interface IGetProductByIdQueryHandler
{
    public Task<Product> Handle(GetProductByIdQuery query, CancellationToken cancellationToken);
}
