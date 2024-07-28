using IShop.Application.MenuItems.Queries;
using IShop.Application.Persistance.Repositories;
using IShop.Domain.MenuItemEntity;

namespace IShop.Infrastructure.Services.MenuItems;
public class GetMenuItemsByRoleQueryHandler(
    IMenuItemRepository menuItemRepository) : IGetMenuItemsByRoleQueryHandler
{
    public async Task<IEnumerable<MenuItem>> Handle(GetMenuItemsByRoleQuery query, CancellationToken cancellationToken)
    {
        return await menuItemRepository.GetMenuItemsByRole(query.Role, cancellationToken);
    }
}
