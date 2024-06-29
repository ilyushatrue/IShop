using Flags.Domain.UserRoot;

namespace Flags.Application.Users.Queries;
public interface IGetAllUsersQueryHandler
{
    Task<List<User>> Handle(CancellationToken cancellationToken);
}
