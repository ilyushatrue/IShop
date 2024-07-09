namespace Flags.Contracts.Products;
public record ProductCategoryDto(
    int Id,
    string Name,
    int Order,
    string? IconName);
