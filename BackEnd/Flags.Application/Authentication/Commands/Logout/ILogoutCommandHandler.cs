using ErrorOr;

namespace Flags.Application.Authentication.Commands.Logout;
public interface ILogoutCommandHandler
{
    Task<ErrorOr<bool>> Handle(Guid id, CancellationToken cancellationToken);
}
