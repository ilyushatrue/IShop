using IShop.Application.Persistance.Repositories;
using IShop.Domain.UserRoot.Entities;
using IShop.Infrastructure.Persistance;
using Microsoft.EntityFrameworkCore;

namespace IShop.Infrastructure.Persistance.Repositories;

public class RefreshJwtRepository(
    AppDbContext dbContext) : IRefreshJwtRepository
{
    public void Create(RefreshJwt token)
    {
        dbContext.RefreshJwts.Add(token);
    }

    public void Delete(RefreshJwt token)
    {
        dbContext.Remove(token);
    }

    public async Task<RefreshJwt?> GetByIdAsync(Guid userId, CancellationToken cancellationToken)
    {
        return await dbContext.RefreshJwts
            .Where(x => x.Id == userId)
            .Include(x => x.User)
            .SingleOrDefaultAsync(cancellationToken);
    }

    public void Update(RefreshJwt token)
    {
        dbContext.Update(token);
    }
}
