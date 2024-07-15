using Flags.Application.Persistance.Repositories;
using Flags.Domain.MenuItemEntity;
using Microsoft.EntityFrameworkCore;

namespace Flags.Infrastructure.Persistance.Repositories;
public class MenuItemRepository(
    AppDbContext dbContext) : IMenuItemRepository
{
    public async Task<List<MenuItem>> GetAllMenuItems()
    {
        return await dbContext.MenuItems.ToListAsync();
    }
}
