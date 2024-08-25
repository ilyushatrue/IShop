namespace IShop.Application.Products.Commands;
public interface IAddProductToCartCommandHandler
{
    Task<bool> Handle(AddProductToCartCommand command, CancellationToken cancellationToken);
}
