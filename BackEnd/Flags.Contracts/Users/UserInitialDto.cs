using Flags.Contracts.MenuItems;

namespace Flags.Contracts.Authentication;

public record UserInitialDto(
    string FirstName,
    string LastName,
    string Email,
    IEnumerable<MenuItemDto> MenuItems,
    string? Phone,
    Guid? AvatarId = null);
