using Flags.Contracts.MenuItems;
using Flags.Contracts.Products;

namespace Flags.Contracts.Users;

public record UserInitialDto(
    string FirstName,
    string LastName,
    string Email,
    IEnumerable<MenuItemDto> MenuItems,
    IEnumerable<ProductDto> FavoriteProducts,
    string? Phone,
    Guid? AvatarId = null);
