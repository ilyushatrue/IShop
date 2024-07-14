using Flags.Domain.Enums;
using Flags.Domain.UserRoot;
using Microsoft.EntityFrameworkCore;

namespace Flags.Application.Persistance.Repositories;
public interface IUserRepository
{
    Task<bool> CheckUserExistsByIdAsync(Guid id);
    Task<bool> CheckUserWithEmailExistsAsync(string email);
    Task<bool> CheckUserWithPhoneExistsAsync(string phone);
    Task<User?> GetByEmailAsync(string email, Func<DbContext, string> func);
    Task<User?> GetByPhoneAsync(string phone);
    Task<User?> GetByIdAsync(Guid id);
    void Create(User user);
    void Update(User user);
    Task<List<User>> GetAllAsync();
    Task<HashSet<PermissionFlag>> GetPermissionsAsync(Guid userId);
}
