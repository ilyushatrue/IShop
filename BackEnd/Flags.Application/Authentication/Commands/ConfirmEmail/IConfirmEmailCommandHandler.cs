
using Flags.Application.Authentication.Common;

namespace Flags.Application.Authentication.Commands.VerifyEmail;
public interface IConfirmEmailCommandHandler
{
    Task<AuthenticationResult> Handle(Guid emailConfirationToken);
}
