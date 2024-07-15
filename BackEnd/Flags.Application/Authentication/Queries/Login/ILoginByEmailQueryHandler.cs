using Flags.Application.Authentication.Common;

namespace Flags.Application.Authentication.Queries.Login;
public interface ILoginByEmailQueryHandler
{
    Task<AuthenticationResult> Handle(LoginByEmailQuery query, CancellationToken cancellationToken);
}
