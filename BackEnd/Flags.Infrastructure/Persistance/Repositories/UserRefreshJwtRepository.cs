using Flags.Application.Persistance.Repositories;
using Flags.Domain.UserRoot.Entities;
using Microsoft.EntityFrameworkCore;

namespace Flags.Infrastructure.Persistance.Repositories;

public class RefreshJwtRepository(
    FlagDbContext dbContext) : IRefreshJwtRepository
{
    public async Task<int> CreateAsync(RefreshJwt token)
    {
        dbContext.RefreshJwts.Add(token);
        return await dbContext.SaveChangesAsync();
    }

    public async Task<int> DeleteAsync(RefreshJwt token)
    {
        dbContext.Remove(token);
        return await dbContext.SaveChangesAsync();
    }

    public async Task<RefreshJwt?> GetByIdAsync(Guid userId)
    {
        return await dbContext.RefreshJwts
            .Where(x => x.Id == userId)
            .Include(x => x.User)
            .SingleOrDefaultAsync();
    }

    public async Task<int> UpdateAsync(RefreshJwt token)
    {
        dbContext.Update(token);
        return await dbContext.SaveChangesAsync();
    }
}
