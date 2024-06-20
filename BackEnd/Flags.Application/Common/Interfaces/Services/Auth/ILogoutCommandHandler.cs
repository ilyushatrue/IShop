using ErrorOr;
using Flags.Application.Authentication.Commands;

namespace Flags.Application.Common.Interfaces.Services.Auth;
public interface ILogoutCommandHandler
{
    Task<ErrorOr<bool>> Handle(LogoutCommand command, CancellationToken cancellationToken);
}
