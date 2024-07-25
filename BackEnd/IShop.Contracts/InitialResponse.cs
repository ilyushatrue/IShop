using IShop.Contracts.MenuItems;
using IShop.Contracts.Products;
using IShop.Contracts.Users;

namespace IShop.Contracts;
public class InitialResponse
{
    public UserInitialDto? User { get; set; }
    public IEnumerable<MenuItemDto> MenuItems { get; set; } = null!;
    public IEnumerable<ProductCategoryDto> ProductCategories { get; set; } = null!;
}
