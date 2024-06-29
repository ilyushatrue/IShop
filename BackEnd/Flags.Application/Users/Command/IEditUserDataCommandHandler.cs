using Flags.Domain.UserRoot;

namespace Flags.Application.Users.Command;
public interface IEditUserDataCommandHandler
{
    Task<User> Handle(EditUserDataCommand command, CancellationToken cancellationToken);
}
