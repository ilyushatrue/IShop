using Flags.Application.Authentication.Common;

namespace Flags.Application.Authentication.Commands.Login;
public interface ILoginByPhoneQueryHandler
{
    Task<AuthenticationResult> Handle(string phone, string password, CancellationToken cancellationToken);
}
