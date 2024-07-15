namespace Flags.Application.Authentication.Commands.ResetPassword;
public interface ISendResetPasswordEmailCommandHandler
{
    Task Handle(string userEmail, CancellationToken cancellationToken);
}
