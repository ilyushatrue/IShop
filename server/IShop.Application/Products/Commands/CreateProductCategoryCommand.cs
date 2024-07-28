namespace IShop.Application.Products.Commands;
public record CreateProductCategoryCommand(
    string Name,
    string Title,
    int Order,
    int? ParentId,
    string? IconName);
