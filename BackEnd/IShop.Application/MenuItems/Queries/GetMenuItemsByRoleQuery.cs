using IShop.Domain.Enums;

namespace IShop.Application.MenuItems.Queries;
public record GetMenuItemsByRoleQuery(
    RoleEnum Role);
