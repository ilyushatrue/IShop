namespace Flags.Application.Authentication.Commands.Logout;
public interface ILogoutCommandHandler
{
    Task<bool> Handle(Guid id, CancellationToken cancellationToken);
}
