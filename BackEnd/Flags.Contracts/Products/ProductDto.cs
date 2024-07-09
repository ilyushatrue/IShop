namespace Flags.Contracts.Products;
public record ProductDto(
    Guid Id,
    string Name,
    string Description,
    string ImageId,
    decimal Price,
    int CategoryId);
