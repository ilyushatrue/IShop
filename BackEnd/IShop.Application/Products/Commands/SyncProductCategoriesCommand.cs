using IShop.Domain.ProductRoot.Entities;

namespace IShop.Application.Products.Commands;
public record SyncProductCategoriesCommand(
    IEnumerable<ProductCategory> Categories);
