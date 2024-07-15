namespace Flags.Application.Authentication.Commands.ResetPassword;
public interface ISendResetPasswordFormCommandHandler
{
    Task<string> Handle(string token, CancellationToken cancellationToken);
}
