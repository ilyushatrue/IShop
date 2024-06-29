using Flags.Domain.UserRoot;

namespace Flags.Application.Users.Queries;
public interface IGetUserByIdQueryHandler
{
    Task<User> Handle(Guid id, CancellationToken cancellationToken);
}
