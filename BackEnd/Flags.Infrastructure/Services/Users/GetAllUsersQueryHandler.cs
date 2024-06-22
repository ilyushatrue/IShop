using ErrorOr;
using Flags.Application.Common.Persistance;
using Flags.Application.Users.Queries;
using Flags.Domain.UserRoot;

namespace Flags.Infrastructure.Services.Users;

public class GetAllUsersQueryHandler(
    IUserRepository userRepository
) : IGetAllUsersQueryHandler
{
    public async Task<ErrorOr<List<User>>> Handle(CancellationToken cancellationToken)
    {
        var users = await userRepository.GetAllAsync();
        return users;
    }
}
