using IShop.Domain.ProductRoot;

namespace IShop.Application.Products.Queries;
public interface IGetProductByIdQueryHandler
{
    public Task<Product> Handle(GetProductByIdQuery query, CancellationToken cancellationToken);
}
