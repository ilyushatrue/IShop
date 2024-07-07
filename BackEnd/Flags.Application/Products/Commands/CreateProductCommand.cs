namespace Flags.Application.Products.Commands;
public record CreateProductCommand(
    string Name,
    string? Description,
    decimal Price,
    int categoryId,
    Guid ImageId
    );
