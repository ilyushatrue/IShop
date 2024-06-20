using ErrorOr;
using Flags.Application.Users.Command;
using Flags.Domain.UserRoot;

namespace Flags.Application.Common.Interfaces.Services.Users;
public interface IEditUserDataCommandHandler
{
    Task<ErrorOr<User>> Handle(EditUserDataCommand command, CancellationToken cancellationToken);
}
