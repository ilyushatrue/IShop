using Flags.Domain.UserRoot.ValueObjects;

namespace Flags.Application.Authentication.Commands.ConfirmEmail;
public interface ISendEmailConfirmEmailCommandHandler
{
    Task<bool> Handle(string email);
}
