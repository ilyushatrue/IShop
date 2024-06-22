using ErrorOr;

namespace Flags.Application.Authentication.Commands.Logout;
public interface ILogoutCommandHandler
{
    Task<ErrorOr<bool>> Handle(LogoutCommand command, CancellationToken cancellationToken);
}
