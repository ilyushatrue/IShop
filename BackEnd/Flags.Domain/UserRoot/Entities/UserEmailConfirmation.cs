using Flags.Domain.Common.Models;

namespace Flags.Domain.UserRoot.Entities;
public class UserEmailConfirmation : Entity<Guid>
{
    private UserEmailConfirmation() { }
    public UserEmailConfirmation(Guid userId, Guid confirmationToken, DateTime expiryDateTime)
    {
        Id = userId;
        ConfirmationToken = confirmationToken;
        ExpiryDateTime = expiryDateTime;
    }
    public bool IsConfirmed { get; private set; }
    public Guid ConfirmationToken { get; private set; }
    public DateTime ExpiryDateTime { get; private set; }

    public User? User { get; }


    public void SetIsConfirmed() => IsConfirmed = true;
}
