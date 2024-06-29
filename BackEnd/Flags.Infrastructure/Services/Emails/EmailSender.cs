using Flags.Application.AppSettings;
using System.Net.Mail;
using System.Net;
using Flags.Application.Emails;
using Microsoft.Extensions.Options;

namespace Flags.Infrastructure.Services.Emails;
public class EmailSender(
    IOptions<EmailSettings> emailSettings) : IEmailSender
{
    private readonly EmailSettings emailSettings = emailSettings.Value;

    public async Task SendEmailAsync(string email, string subject, string message)
    {
        var client = new SmtpClient(emailSettings.SmtpServer, emailSettings.SmtpPort)
        {
            Credentials = new NetworkCredential(emailSettings.Username, emailSettings.Password),
            EnableSsl = true
        };

        var mailMessage = new MailMessage
        {
            From = new MailAddress(emailSettings.SenderEmail, emailSettings.SenderName),
            Subject = subject,
            Body = message,
            IsBodyHtml = true
        };

        mailMessage.To.Add(email);

        await client.SendMailAsync(mailMessage);
    }
}
