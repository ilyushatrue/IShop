using Flags.Application.Persistance.Repositories;
using Flags.Domain.MenuItemEntity;
using Microsoft.EntityFrameworkCore;

namespace Flags.Infrastructure.Persistance.Repositories;
public class MenuItemRepository(
    FlagDbContext flagDbContext) : IMenuItemRepository
{
    public async Task<List<MenuItem>> GetAllMenuItems()
    {
        return await flagDbContext.MenuItems.ToListAsync();
    }
}
