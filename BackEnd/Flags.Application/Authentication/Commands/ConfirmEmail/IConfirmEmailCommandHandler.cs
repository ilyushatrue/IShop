using Flags.Application.Authentication.Common;

namespace Flags.Application.Authentication.Commands.ConfirmEmail;
public interface IConfirmEmailCommandHandler
{
    Task<AuthenticationResult> Handle(Guid emailConfirationToken, CancellationToken cancellationToken);
}
