using Flags.Domain.MenuItemEntity;

namespace Flags.Application.Persistance.Repositories;
public interface IMenuItemRepository
{
    Task<List<MenuItem>> GetAllMenuItems();
}
