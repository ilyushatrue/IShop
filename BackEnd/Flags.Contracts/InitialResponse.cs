using Flags.Contracts.Products;
using Flags.Contracts.Users;

namespace Flags.Contracts;
public class InitialResponse
{
    public UserInitialDto User { get; set; } = null!;
    public IEnumerable<ProductCategoryDto> ProductCategories { get; set; } = null!;
}
