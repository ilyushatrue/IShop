using Flags.Domain.Enums;
using Flags.Domain.UserRoot;
using Flags.Domain.UserRoot.ValueObjects;

namespace Flags.Application.Persistance.Repositories;
public interface IUserRepository
{
    Task<bool> CheckUserExistsByIdAsync(Guid id);
    Task<bool> CheckUserWithEmailExistsAsync(string email);
    Task<bool> CheckUserWithPhoneExistsAsync(string phone);
    Task<User?> GetByEmailAsync(string email);
    Task<User?> GetByPhoneAsync(string phone);
    Task<User?> GetByIdAsync(Guid id);
    Task CreateAsync(User user);
    Task UpdateAsync(User user);
    Task<List<User>> GetAllAsync();
    Task<HashSet<PermissionEnum>> GetPermissionsAsync(Guid userId);
}
