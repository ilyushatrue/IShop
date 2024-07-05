using Flags.Application.Authentication.Common;

namespace Flags.Application.Authentication.Commands.RefreshJwt;
public interface IRefreshJwtCommandHandler
{
    Task<AuthenticationResult> Handle(string email, CancellationToken cancellationToken);
}
