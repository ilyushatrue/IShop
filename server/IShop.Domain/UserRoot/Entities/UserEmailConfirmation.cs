using IShop.Domain.Common.Models;
using IShop.Domain.UserRoot;

namespace IShop.Domain.UserRoot.Entities;
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

    public void UpdateToken(DateTime expiryDateTime)
    {
        ConfirmationToken = Guid.NewGuid();
        if (expiryDateTime <= ExpiryDateTime)
        {
            throw new Exception("Ноовый сроок деействиия тоокеенаа мееньшее иилии раавеен срооку сущеествующеегоо.");
        }
        ExpiryDateTime = expiryDateTime;
    }

    public void SetIsConfirmed()
    {
        IsConfirmed = true;
        ConfirmationToken = Guid.NewGuid();
    }
}
