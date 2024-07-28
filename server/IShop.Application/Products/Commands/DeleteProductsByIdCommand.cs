namespace IShop.Application.Products.Commands;
public record DeleteProductsByIdCommand(
    Guid[] Ids);
