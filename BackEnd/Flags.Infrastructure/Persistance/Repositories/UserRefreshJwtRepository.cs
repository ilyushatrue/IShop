using Flags.Application.Common.Interfaces.Persistance;
using Flags.Domain.UserRoot.Entities;
using Microsoft.EntityFrameworkCore;

namespace Flags.Infrastructure.Persistance.Repositories;

public class UserRefreshJwtRepository(FlagDbContext dbContext) : BaseRepository<UserRefreshJwt, Guid>(dbContext), IUserRefreshJwtRepository
{
    public async Task<UserRefreshJwt?> GetByTokenAsync(string refreshToken)
    {
        return await dbContext.UserRefreshJwts
            .Where(x => x.Token == refreshToken)
            .Include(x => x.User)
            .SingleOrDefaultAsync();
    }
}
