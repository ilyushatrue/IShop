namespace IShop.Application.Emails;
public interface IEmailSender
{
    Task SendEmailAsync(string email, string subject, string message);
}
