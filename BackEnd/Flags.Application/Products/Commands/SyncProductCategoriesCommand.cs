using Flags.Domain.ProductRoot.Entities;

namespace Flags.Application.Products.Commands;
public record SyncProductCategoriesCommand(
    IEnumerable<ProductCategory> Categories);
