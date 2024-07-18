using Flags.Application.MenuItems.Queries;
using Flags.Application.Persistance.Repositories;
using Flags.Domain.MenuItemEntity;

namespace Flags.Infrastructure.Services.MenuItems;
public class GetMenuItemsByRoleQueryHandler(
    IMenuItemRepository menuItemRepository) : IGetMenuItemsByRoleQueryHandler
{
    public async Task<IEnumerable<MenuItem>> Handle(GetMenuItemsByRoleQuery query, CancellationToken cancellationToken)
    {
        return await menuItemRepository.GetMenuItemsByRole(query.Role, cancellationToken);
    }
}
