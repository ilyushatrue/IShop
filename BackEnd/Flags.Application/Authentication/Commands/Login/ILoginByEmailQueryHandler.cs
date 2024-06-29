using Flags.Application.Authentication.Common;
using Flags.Application.Authentication.Queries;

namespace Flags.Application.Authentication.Commands.Login;
public interface ILoginByEmailQueryHandler
{
    Task<AuthenticationResult> Handle(LoginByEmailQuery query, CancellationToken cancellationToken);
}
