using Flags.Application.Authentication.Common;

namespace Flags.Application.Authentication.Commands.Register;

public interface IRegisterCommandHandler
{
    Task<AuthenticationResult> Handle(RegisterCommand command, CancellationToken cancellationToken);
}
