using IShop.Application.Authentication.Common;

namespace IShop.Application.Authentication.Commands.RefreshJwt;
public interface IRefreshJwtCommandHandler
{
    Task<AuthenticationResult> Handle(string email, CancellationToken cancellationToken);
}
