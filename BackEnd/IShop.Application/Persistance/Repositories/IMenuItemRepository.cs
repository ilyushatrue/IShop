using IShop.Domain.Enums;
using IShop.Domain.MenuItemEntity;

namespace IShop.Application.Persistance.Repositories;
public interface IMenuItemRepository
{
    Task<List<MenuItem>> GetMenuItemsByRole(RoleEnum role, CancellationToken cancellationToken);
}
