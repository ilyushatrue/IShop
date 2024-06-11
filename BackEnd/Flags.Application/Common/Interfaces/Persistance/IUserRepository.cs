using Flags.Domain.Enums;
using Flags.Domain.UserEntity;

namespace Flags.Application.Common.Interfaces.Persistance;
public interface IUserRepository
{
    Task<User?> GetByEmailAsync(string email);
    Task<User?> GetByPhoneAsync(string phone);
    Task<User?> GetByIdAsync(Guid id);
    Task AddAsync(User user);
    Task UpdateAsync(User user);
    Task<List<User>> GetAllAsync();
    Task<HashSet<PermissionEnum>> GetPermissionsAsync(Guid userId);
}
