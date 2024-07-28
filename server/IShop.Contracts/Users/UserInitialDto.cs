using IShop.Contracts.Products;

namespace IShop.Contracts.Users;

public record UserInitialDto(
    string FirstName,
    string LastName,
    string Email,
    IEnumerable<ProductDto> FavoriteProducts,
    string? Phone,
    Guid? AvatarId = null);
