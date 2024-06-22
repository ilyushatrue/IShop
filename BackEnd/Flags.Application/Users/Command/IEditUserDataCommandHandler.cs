using ErrorOr;
using Flags.Domain.UserRoot;

namespace Flags.Application.Users.Command;
public interface IEditUserDataCommandHandler
{
    Task<ErrorOr<User>> Handle(EditUserDataCommand command, CancellationToken cancellationToken);
}
