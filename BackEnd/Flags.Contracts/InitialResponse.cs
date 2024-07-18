using Flags.Contracts.MenuItems;
using Flags.Contracts.Products;
using Flags.Contracts.Users;

namespace Flags.Contracts;
public class InitialResponse
{
    public UserInitialDto? User { get; set; }
    public IEnumerable<MenuItemDto> MenuItems { get; set; } = null!;
    public IEnumerable<ProductCategoryDto> ProductCategories { get; set; } = null!;
}
