using Flags.Application.Common.Interfaces.Persistance;
using Flags.Domain.User.Entities;
using Microsoft.EntityFrameworkCore;

namespace Flags.Infrastructure.Persistance.Repositories;
public class UserRepository(FlagDbContext dbContext) : IUserRepository
{
    public async Task Add(User user)
    {
        dbContext.Add(user);
        await dbContext.SaveChangesAsync();
    }

    public async Task<User?> GetUserByEmail(string email)
    {
        return await dbContext.Users.SingleOrDefaultAsync(u => u.Email.Value == email);
    }

    public async Task<List<User>> GetAll()
    {
        return await dbContext.Users.ToListAsync();
    }
}
