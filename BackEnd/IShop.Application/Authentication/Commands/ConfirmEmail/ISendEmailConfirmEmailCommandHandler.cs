namespace IShop.Application.Authentication.Commands.ConfirmEmail;
public interface ISendEmailConfirmEmailCommandHandler
{
    Task<bool> Handle(string email, CancellationToken cancellationToken);
}
