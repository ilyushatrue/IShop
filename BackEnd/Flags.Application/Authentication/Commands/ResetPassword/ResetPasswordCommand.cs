namespace Flags.Application.Authentication.Commands.ResetPassword;
public record ResetPasswordCommand(
    string Token,
    string NewPassword);
