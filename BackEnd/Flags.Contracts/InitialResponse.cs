using Flags.Contracts.Authentication;
using Flags.Contracts.Products;

namespace Flags.Application;
public class InitialResponse
{
    public AuthenticationResponse? User { get; set; } 
    public IEnumerable<ProductCategoryDto> ProductCategories { get; set; } = null!;
}
