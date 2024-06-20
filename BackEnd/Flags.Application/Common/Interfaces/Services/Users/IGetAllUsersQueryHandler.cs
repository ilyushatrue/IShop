using ErrorOr;
using Flags.Domain.UserRoot;

namespace Flags.Application.Common.Interfaces.Services.Users;
public interface IGetAllUsersQueryHandler
{
    Task<ErrorOr<List<User>>> Handle(CancellationToken cancellationToken);
}
