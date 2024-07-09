namespace Flags.Application.Products.Commands;
public record CreateProductCategoryCommand(
    string Name,
    int Order,
    string? IconName);
