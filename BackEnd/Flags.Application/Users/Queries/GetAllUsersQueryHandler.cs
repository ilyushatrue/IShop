using ErrorOr;
using Flags.Application.Common.Interfaces.Persistance;
using Flags.Domain.UserEntity;
using MediatR;

namespace Flags.Application.Users.Queries;

public class GetAllUsersQueryHandler(
    IUserRepository userRepository
) : IRequestHandler<GetAllUsersQuery, ErrorOr<List<User>>>
{
    public async Task<ErrorOr<List<User>>> Handle(GetAllUsersQuery request, CancellationToken cancellationToken)
    {
        var users = await userRepository.GetAllAsync();
        return users;
    }
}
