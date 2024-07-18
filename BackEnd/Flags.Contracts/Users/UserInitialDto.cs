using Flags.Contracts.MenuItems;
using Flags.Contracts.Products;

namespace Flags.Contracts.Users;

public record UserInitialDto(
    string FirstName,
    string LastName,
    string Email,
    IEnumerable<ProductDto> FavoriteProducts,
    string? Phone,
    Guid? AvatarId = null);
