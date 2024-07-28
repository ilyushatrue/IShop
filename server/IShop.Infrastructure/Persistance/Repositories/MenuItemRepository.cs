using IShop.Application.Persistance.Repositories;
using IShop.Domain.Enums;
using IShop.Domain.MenuItemEntity;
using IShop.Infrastructure.Persistance;
using Microsoft.EntityFrameworkCore;

namespace IShop.Infrastructure.Persistance.Repositories;
public class MenuItemRepository(
    AppDbContext dbContext) : IMenuItemRepository
{
    public async Task<List<MenuItem>> GetMenuItemsByRole(RoleEnum role, CancellationToken cancellationToken)
    {
        return await dbContext.Roles
            .Where(r => r.Id == (int)role)
            .Include(r => r.MemuItems)
            .SelectMany(r => r.MemuItems!)
            .ToListAsync(cancellationToken);
    }
}
