namespace IShop.Application.Authentication.Commands.ResetPassword;
public interface IResetPasswordCommandHandler
{
    Task<string> Handle(ResetPasswordCommand command, CancellationToken cancellationToken);
}
