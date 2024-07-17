namespace Flags.Application.Products.Commands;
public record DeleteProductsByIdCommand(
    Guid[] Ids);
