using Flags.Application.Persistance.Repositories;
using Flags.Domain.Enums;
using Flags.Domain.MenuItemEntity;
using Microsoft.EntityFrameworkCore;

namespace Flags.Infrastructure.Persistance.Repositories;
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
