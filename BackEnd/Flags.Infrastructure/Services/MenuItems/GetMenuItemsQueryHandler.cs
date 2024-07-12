using Flags.Application.MenuItems.Queries;
using Flags.Application.Persistance.Repositories;
using Flags.Domain.MenuItemEntity;

namespace Flags.Infrastructure.Services.MenuItems;
public class GetMenuItemsQueryHandler(
    IMenuItemRepository menuItemRepository) : IGetMenuItemsQueryHandler
{
    public async Task<IEnumerable<MenuItem>> Handle()
    {
        return await menuItemRepository.GetAllMenuItems();
    }
}
