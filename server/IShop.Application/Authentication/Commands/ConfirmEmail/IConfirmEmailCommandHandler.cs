using IShop.Application.Authentication.Common;

namespace IShop.Application.Authentication.Commands.ConfirmEmail;
public interface IConfirmEmailCommandHandler
{
    Task<AuthenticationResult> Handle(Guid emailConfirationToken, CancellationToken cancellationToken);
}
