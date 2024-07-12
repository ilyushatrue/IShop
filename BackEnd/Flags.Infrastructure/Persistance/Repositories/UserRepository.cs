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

    public void Create(User user)
    {
        dbContext.Add(user);
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        return await dbContext.Users
            .Include(u => u.RefreshJwt)
            .Include(u => u.Role)
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
            .Include(u => u.Role)
            .Include(u => u.EmailConfirmation)
            .Where(u => u.Phone != null)
            .SingleOrDefaultAsync(u => u.Phone!.Value == phone);
    }

    public async Task<User?> GetByIdAsync(Guid id)
    {
        return await dbContext.Users
            .Include(u => u.Role).ThenInclude(r => r!.MemuItems)
            .SingleOrDefaultAsync(u => u.Id == id);
    }

    public async Task<HashSet<PermissionFlag>> GetPermissionsAsync(Guid userId)
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
            .Select(p => (PermissionFlag)p.Id)
            .ToHashSet();
    }

    public void Update(User user)
    {
        dbContext.Update(user);
    }

    public async Task<bool> CheckUserExistsByIdAsync(Guid id)
    {
        return await dbContext.Users.AnyAsync(u => u.Id == id);
    }
}
