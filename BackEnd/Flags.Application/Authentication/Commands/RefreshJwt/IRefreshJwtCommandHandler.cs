using Flags.Application.Authentication.Common;

namespace Flags.Application.Authentication.Commands.RefreshJwt;
public interface IRefreshJwtCommandHandler
{
    Task<AuthenticationResult> Handle(string userPhone, CancellationToken cancellationToken);
}
