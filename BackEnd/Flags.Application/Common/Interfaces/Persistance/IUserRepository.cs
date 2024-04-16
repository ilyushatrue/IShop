using Flags.Domain.User.Entities;

namespace Flags.Application.Common.Interfaces.Persistance;
public interface IUserRepository
{
    Task<User?> GetUserByEmailAsync(string email);
    Task<User?> GetUserByPhoneAsync(string phone);
    Task AddAsync(User user);
    Task<List<User>> GetAllAsync();
    Task<User?> GetByIdAsync(Guid id);
}
