using Flags.Contracts.Products;

namespace Flags.Application;
public class InitialResponse
{
    public IEnumerable<ProductCategoryDto> ProductCategories { get; set; } = null!;
}
