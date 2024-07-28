using IShop.Application.Persistance.Repositories;
using IShop.Domain.UserRoot.Entities;
using Microsoft.EntityFrameworkCore;

namespace IShop.Infrastructure.Persistance.Repositories;
public class UserEmailConfirmationRepository(AppDbContext dbContext) : IUserEmailConfirmationRepository
{
    public void Create(UserEmailConfirmation emailConfirmation)
    {
        dbContext.UserEmailConfirmations.Add(emailConfirmation);
    }

    public async Task<UserEmailConfirmation?> GetByTokenAsync(Guid emailConfirmationToken, CancellationToken cancellationToken)
    {
        return await dbContext.UserEmailConfirmations
            .Where(x => x.ConfirmationToken == emailConfirmationToken)
            .Include(x => x.User!.RefreshJwt)
            .SingleOrDefaultAsync(cancellationToken);
    }

    public async Task<bool> ValidateTokenAsync(Guid emailConfirmationToken, CancellationToken cancellationToken)
    {
        return await dbContext.UserEmailConfirmations
            .Where(cc =>
                cc.ConfirmationToken == emailConfirmationToken
                && cc.ExpiryDateTime > DateTime.UtcNow)
            .AnyAsync(cancellationToken);
    }
}
