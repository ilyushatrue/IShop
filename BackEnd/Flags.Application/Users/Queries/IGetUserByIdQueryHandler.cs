using ErrorOr;
using Flags.Domain.UserRoot;

namespace Flags.Application.Users.Queries;
public interface IGetUserByIdQueryHandler
{
    Task<ErrorOr<User?>> Handle(string id, CancellationToken cancellationToken);
}
