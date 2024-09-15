namespace IShop.Application.Products.Queries;
public record GetProductsByCategoryQuery(
    int CurrentPage,
    int PageSize,
    int? CategoryId,
    string? Search,
    int? MinPrice,
    int? MaxPrice);
