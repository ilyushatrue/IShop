using IShop.Application.Persistance;
using IShop.Application.Persistance.Repositories;
using IShop.Application.Products.Commands;

namespace IShop.Infrastructure.Services.Products;
public class AddProductToCartCommandHandler(
    IDbManager dbManager,
    IProductRepository productRepository) : IAddProductToCartCommandHandler
{
    public Task<bool> Handle(AddProductToCartCommand command, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
