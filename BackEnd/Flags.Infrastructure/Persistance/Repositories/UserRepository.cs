using Flags.Application.Common.Interfaces.Persistance;
using Flags.Domain.User.Entities;
using Mapster;
using Microsoft.EntityFrameworkCore;

namespace Flags.Infrastructure.Persistance.Repositories;
public class UserRepository(FlagDbContext dbContext) : IUserRepository
{
    public async Task AddAsync(User user)
    {
        dbContext.Add(user);
        await dbContext.SaveChangesAsync();
    }

    public async Task<User?> GetUserByEmailAsync(string email)
    {
        return await dbContext.Users.SingleOrDefaultAsync(u => u.Email.Value == email);
    }

    public async Task<List<User>> GetAllAsync()
    {
        return await dbContext.Users.ToListAsync();
    }

    public async Task<User?> GetUserByPhoneAsync(string phone)
    {
        return await dbContext.Users.SingleOrDefaultAsync(u => u.Phone.Value == phone);
    }

    public async Task<User?> GetByIdAsync(Guid id)
    {
        return await dbContext.Users.SingleOrDefaultAsync(u => u.Id == id);
    }
}
