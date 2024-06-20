using ErrorOr;
using Flags.Application.Authentication.Commands;
using Flags.Application.Authentication.Common;

namespace Flags.Application.Common.Interfaces.Services.Auth;

public interface IRegisterCommandHandler
{
    Task<ErrorOr<AuthenticationResult>> Handle(RegisterCommand command, CancellationToken cancellationToken);
}
