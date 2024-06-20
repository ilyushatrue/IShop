using ErrorOr;
using Flags.Application.Users.Queries;
using Flags.Domain.UserRoot;

namespace Flags.Application.Common.Interfaces.Services.Users;
public interface IGetUserByIdQueryHandler
{
    Task<ErrorOr<User?>> Handle(GetUserByIdQuery request, CancellationToken cancellationToken);
}
