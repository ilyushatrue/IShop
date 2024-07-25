using IShop.Application.Authentication.Common;

namespace IShop.Application.Authentication.Queries.Login;
public interface ILoginByEmailQueryHandler
{
    Task<AuthenticationResult> Handle(LoginByEmailQuery query, CancellationToken cancellationToken);
}
