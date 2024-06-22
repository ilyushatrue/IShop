using ErrorOr;
using Flags.Application.Authentication.Common;

namespace Flags.Application.Authentication.Commands.Register;

public interface IRegisterCommandHandler
{
    Task<ErrorOr<AuthenticationResult>> Handle(RegisterCommand command, CancellationToken cancellationToken);
}
