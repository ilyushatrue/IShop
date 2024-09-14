namespace IShop.Application.Products.Queries;
public record GetProductsByCategoryQuery(
    int CategoryId,
    string? Search,
    int CurrentPage,
    int PageSize);
