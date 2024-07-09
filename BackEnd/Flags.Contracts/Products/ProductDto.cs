namespace Flags.Contracts.Products;
public record ProductDto(
    string Name,
    string Description,
    string ImageId,
    decimal Price,
    string CategoryName);
