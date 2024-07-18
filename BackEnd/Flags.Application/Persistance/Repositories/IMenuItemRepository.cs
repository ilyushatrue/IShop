using Flags.Domain.Enums;
using Flags.Domain.MenuItemEntity;

namespace Flags.Application.Persistance.Repositories;
public interface IMenuItemRepository
{
    Task<List<MenuItem>> GetMenuItemsByRole(RoleFlag role, CancellationToken cancellationToken);
}
