using Flags.Domain.MenuItemEntity;

namespace Flags.Application.MenuItems.Queries;
public interface IGetMenuItemsByRoleQueryHandler
{
    Task<IEnumerable<MenuItem>> Handle(GetMenuItemsByRoleQuery query, CancellationToken cancellationToken);
}
