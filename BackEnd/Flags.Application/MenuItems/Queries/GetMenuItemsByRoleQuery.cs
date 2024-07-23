using Flags.Domain.Enums;

namespace Flags.Application.MenuItems.Queries;
public record GetMenuItemsByRoleQuery(
    RoleEnum Role);
