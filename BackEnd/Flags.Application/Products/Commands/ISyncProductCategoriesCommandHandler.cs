using Flags.Domain.ProductRoot.Entities;

namespace Flags.Application.Products.Commands;
public interface ISyncProductCategoriesCommandHandler
{
    Task<bool> Handle(IEnumerable<ProductCategory> categories);
}
