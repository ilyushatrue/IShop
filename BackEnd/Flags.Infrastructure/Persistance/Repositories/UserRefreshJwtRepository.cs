using Flags.Application.Common.Interfaces.Persistance;
using Flags.Domain.UserRoot.Entities;
using Flags.Infrastructure.Persistance.Extensions;
using Microsoft.EntityFrameworkCore;

namespace Flags.Infrastructure.Persistance.Repositories;

public class UserRefreshJwtRepository(
    FlagDbContext dbContext) : IUserRefreshJwtRepository
{
    public async Task<UserRefreshJwt?> GetByTokenAsync(string refreshToken)
    {
        return await dbContext.UserRefreshJwts
            .Where(x => x.Token == refreshToken)
            .Include(x => x.User)
            .SingleOrDefaultAsync();
    }

    public async Task<int> UpdateAsync(UserRefreshJwt token)
    {
        dbContext.Update(token);
        return await dbContext.SaveChangesAsync();
    }   
}
