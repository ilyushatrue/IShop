using Flags.Application.Persistance.Repositories;
using Flags.Domain.Enums;
using Flags.Domain.UserRoot;
using Microsoft.EntityFrameworkCore;

namespace Flags.Infrastructure.Persistance.Repositories;
public class UserRepository(AppDbContext dbContext) : IUserRepository
{
    public async Task<bool> CheckUserWithEmailExistsAsync(string email, CancellationToken cancellationToken)
    {
        return await dbContext.Users
            .AnyAsync(u => u.Email.Value == email, cancellationToken);
    }

    public async Task<bool> CheckUserWithPhoneExistsAsync(string phone, CancellationToken cancellationToken)
    {
        return await dbContext.Users
            .Where(x => x.Phone != null)
            .AnyAsync(u => u.Phone!.Value == phone, cancellationToken);
    }

    public void Create(User user)
    {
        dbContext.Add(user);
    }

    public async Task<User?> GetByEmailAsync(string email, CancellationToken cancellationToken)
    {
        return await dbContext.Users
            .Where(u => u.Email.Value == email)
            .Include(u => u.RefreshJwt)
            .Include(u => u.Role)
            .Include(u => u.EmailConfirmation)
            .SingleOrDefaultAsync(cancellationToken);
    }

    public async Task<List<User>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await dbContext.Users.ToListAsync(cancellationToken);
    }

    public async Task<User?> GetByPhoneAsync(string phone, CancellationToken cancellationToken)
    {
        return await dbContext.Users
            .AsNoTracking()
            .Where(u => u.Phone != null && u.Phone!.Value == phone)
            .Include(u => u.RefreshJwt)
            .Include(u => u.Role)
            .Include(u => u.EmailConfirmation)
            .SingleOrDefaultAsync(cancellationToken);
    }

    public async Task<User?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await dbContext.Users
            .Where(u => u.Id == id)
            .Include(u => u.FavoriteProducts)!
                .ThenInclude(fp => fp.Product)
            .Include(u => u.Role)
                .ThenInclude(r => r!.MemuItems)
            .SingleOrDefaultAsync(cancellationToken);
    }

    public async Task<HashSet<PermissionEnum>> GetPermissionsAsync(Guid userId)
    {
        var roles = await dbContext.Users
            .AsNoTracking()
            .Include(u => u.Role)
            .ThenInclude(r => r!.Permissions)
            .Where(u => u.Id == userId)
            .Select(u => u.Role)
            .ToArrayAsync();

        return roles
            .Select(u => u)
            .SelectMany(u => u!.Permissions!)
            .Select(p => (PermissionEnum)p.Id)
            .ToHashSet();
    }

    public void Update(User user)
    {
        dbContext.Update(user);
    }

    public async Task<bool> CheckUserExistsByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await dbContext.Users.AnyAsync(u => u.Id == id, cancellationToken);
    }
}
