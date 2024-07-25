namespace IShop.Application.Products.Queries;
public record GetProductsByCategoryQuery(
    int CategoryId,
    int CurrentPage,
    int PageSize);
