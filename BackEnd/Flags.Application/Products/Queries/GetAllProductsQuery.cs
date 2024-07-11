namespace Flags.Application.Products.Queries;
public record GetAllProductsQuery(
    int CurrentPage,
    int PageSize);
