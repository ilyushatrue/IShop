using ErrorOr;
using Flags.Domain.UserRoot;

namespace Flags.Application.Users.Queries;
public interface IGetAllUsersQueryHandler
{
    Task<ErrorOr<List<User>>> Handle(CancellationToken cancellationToken);
}
