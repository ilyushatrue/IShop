using Flags.Application.Persistance.Repositories;
using Flags.Domain.UserRoot.Entities;
using Microsoft.EntityFrameworkCore;

namespace Flags.Infrastructure.Persistance.Repositories;
public class UserEmailConfirmationRepository(FlagDbContext dbContext) : IUserEmailConfirmationRepository
{
    public async Task<int> CreateAsync(UserEmailConfirmation emailConfirmation)
    {
        dbContext.UserEmailConfirmations.Add(emailConfirmation);
        return await dbContext.SaveChangesAsync();
    }

    public async Task<UserEmailConfirmation?> GetByTokenAsync(Guid emailConfirmationToken)
    {
        return await dbContext.UserEmailConfirmations
            .Include(x => x.User!.RefreshJwt)
            .SingleOrDefaultAsync(x => x.ConfirmationToken == emailConfirmationToken);
    }

    public async Task<bool> ValidateTokenAsync(Guid emailConfirmationToken)
    {
        return await dbContext.UserEmailConfirmations.AnyAsync(cc => 
            cc.ConfirmationToken == emailConfirmationToken 
            && cc.ExpiryDateTime > DateTime.UtcNow);
    }
}
