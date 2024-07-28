using IShop.Application.Authentication.Common;

namespace IShop.Application.Authentication.Queries.Login;
public interface ILoginByPhoneQueryHandler
{
    Task<AuthenticationResult> Handle(string phone, string password, CancellationToken cancellationToken);
}
