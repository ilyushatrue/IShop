using IShop.Domain.MenuItemEntity;

namespace IShop.Application.MenuItems.Queries;
public interface IGetMenuItemsByRoleQueryHandler
{
    Task<IEnumerable<MenuItem>> Handle(GetMenuItemsByRoleQuery query, CancellationToken cancellationToken);
}
