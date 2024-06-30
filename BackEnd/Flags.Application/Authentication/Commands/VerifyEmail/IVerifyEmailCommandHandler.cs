
using Flags.Application.Authentication.Common;

namespace Flags.Application.Authentication.Commands.VerifyEmail;
public interface IVerifyEmailCommandHandler
{
    Task<AuthenticationResult> Handle(Guid userId);
}
