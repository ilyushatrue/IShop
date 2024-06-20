using ErrorOr;
using Flags.Application.Authentication.Commands;
using Flags.Application.Authentication.Common;

namespace Flags.Application.Common.Interfaces.Services.Auth;
public interface IRefreshJwtCommandHandler
{
    Task<ErrorOr<AuthenticationResult>> Handle(RefreshJwtCommand command, CancellationToken cancellationToken);
}
