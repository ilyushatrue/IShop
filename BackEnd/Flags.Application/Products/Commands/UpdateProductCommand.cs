namespace Flags.Application.Products.Commands;
public record UpdateProductCommand(
    Guid Id,
    string Name,
    string Description,
    Guid ImageId,
    decimal Price,
    int CategoryId);
