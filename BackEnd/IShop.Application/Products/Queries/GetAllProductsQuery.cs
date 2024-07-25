namespace IShop.Application.Products.Queries;
public record GetAllProductsQuery(
    int CurrentPage,
    int PageSize);
