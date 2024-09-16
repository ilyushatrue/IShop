namespace IShop.Application.Products.Commands;
public record AddProductToCartCommand(Guid ProductId, Guid UserId);
