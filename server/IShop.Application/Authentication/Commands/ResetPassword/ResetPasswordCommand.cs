namespace IShop.Application.Authentication.Commands.ResetPassword;
public record ResetPasswordCommand(
    string Token,
    string NewPassword);
