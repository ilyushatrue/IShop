using Flags.Application.Persistance.Repositories;
using Flags.Domain.Enums;
using Flags.Domain.UserRoot;
using Microsoft.EntityFrameworkCore;

namespace Flags.Infrastructure.Persistance.Repositories;
public class UserRepository(FlagDbContext dbContext) : IUserRepository
{
    public async Task<bool> CheckUserWithEmailExistsAsync(string email)
    {
        return await dbContext.Users.AnyAsync(u => u.Email.Value == email);
    }

    public async Task<bool> CheckUserWithPhoneExistsAsync(string phone)
    {
        return await dbContext.Users.Where(x => x.Phone != null).AnyAsync(u => u.Phone!.Value == phone);
    }

    public async Task CreateAsync(User user)
    {
        dbContext.Add(user);
        await dbContext.SaveChangesAsync();
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        return await dbContext.Users
            .Include(u => u.RefreshJwt)
            .Include(u => u.EmailConfirmation)
            .SingleOrDefaultAsync(u => u.Email.Value == email);
    }

    public async Task<List<User>> GetAllAsync()
    {
        return await dbContext.Users.ToListAsync();
    }

    public async Task<User?> GetByPhoneAsync(string phone)
    {
        return await dbContext.Users
            .AsNoTracking()
            .Include(u => u.RefreshJwt)
            .Where(u => u.Phone != null)
            .SingleOrDefaultAsync(u => u.Phone!.Value == phone);
    }

    public async Task<User?> GetByIdAsync(Guid id)
    {
        return await dbContext.Users.SingleOrDefaultAsync(u => u.Id == id);
    }

    public async Task<HashSet<PermissionEnum>> GetPermissionsAsync(Guid userId)
    {
        var roles = await dbContext.Users
            .AsNoTracking()
            .Include(u => u.Roles)
            .ThenInclude(r => r.Permissions)
            .Where(u => u.Id == userId)
            .Select(u => u.Roles)
            .ToArrayAsync();

        return roles
            .SelectMany(u => u)
            .SelectMany(u => u.Permissions)
            .Select(p => (PermissionEnum)p.Id)
            .ToHashSet();
    }

    public async Task UpdateAsync(User user)
    {
        dbContext.Update(user);
        await dbContext.SaveChangesAsync();
    }

    public async Task<bool> CheckUserExistsByIdAsync(Guid id)
    {
        return await dbContext.Users.AnyAsync(u => u.Id == id);
    }
}
