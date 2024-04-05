using Flags.Domain.User.Entities;

namespace Flags.Application.Common.Interfaces.Persistance;
public interface IUserRepository
{
    Task<User?> GetUserByEmail(string email);
    Task Add(User user);
    Task<List<User>> GetAll();
}
