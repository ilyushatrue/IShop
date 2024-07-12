using Flags.Contracts.Authentication;
using Flags.Contracts.Products;

namespace Flags.Application;
public class InitialResponse
{
    public UserInitialDto User { get; set; } = null!;
    public IEnumerable<ProductCategoryDto> ProductCategories { get; set; } = null!;
}
