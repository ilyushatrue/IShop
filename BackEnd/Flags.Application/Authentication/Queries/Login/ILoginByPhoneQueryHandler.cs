using Flags.Application.Authentication.Common;

namespace Flags.Application.Authentication.Queries.Login;
public interface ILoginByPhoneQueryHandler
{
    Task<AuthenticationResult> Handle(string phone, string password, CancellationToken cancellationToken);
}
