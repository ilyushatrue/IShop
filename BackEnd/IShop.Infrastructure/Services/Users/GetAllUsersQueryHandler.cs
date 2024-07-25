using IShop.Application.Persistance.Repositories;
using IShop.Application.Users.Queries;
using IShop.Domain.UserRoot;

namespace IShop.Infrastructure.Services.Users;

public class GetAllUsersQueryHandler(
    IUserRepository userRepository
) : IGetAllUsersQueryHandler
{
    public async Task<List<User>> Handle(CancellationToken cancellationToken)
    {
        var users = await userRepository.GetAllAsync(cancellationToken);
        return users;
    }
}
