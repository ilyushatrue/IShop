using Flags.Domain.Common.Models;
using Flags.Domain.MediaEntity;
using Flags.Domain.UserRoot.Entities;
using Flags.Domain.UserRoot.ValueObjects;

namespace Flags.Domain.UserRoot;

public class User : AggregateRoot<Guid>
{
    private readonly List<Role> _roles = [];
    private User() : base(Guid.NewGuid()) { }
    private User(
        Guid id,
        string firstName,
        string lastName,
        string? phone,
        string email,
        string passwordHash,
        DateTime emailConfirmationTokenExpiry,
        Guid? avatarId = null) : this()
    {
        Id = id;
        Update(firstName, lastName, phone, email, avatarId);
        UpdatePassword(passwordHash);
        EmailConfirmation = new(id, Guid.NewGuid(), emailConfirmationTokenExpiry);
    }

    public void UpdatePassword(string passwordHash)
    {
        var password = Password.Create(passwordHash);
        Password = password;
    }

    public void Update(string firstName, string lastName, string? phone, string email, Guid? avatarId)
    {
        var emailObj = Email.Create(email);
        var phoneObj = phone is not null ? Phone.Create(phone) : null;
        FirstName = firstName;
        LastName = lastName;
        Phone = phoneObj;
        Email = emailObj;
        AvatarId = avatarId;
    }

    public static User Create(
        Guid id,
        string firstName,
        string lastName,
        string? phone,
        string email,
        string passwordHash,
        DateTime emailConfirmationTokenExpiry,
        Guid? avatarId)
    {
        return new User(
            id,
            firstName,
            lastName,
            phone,
            email,
            passwordHash,
            emailConfirmationTokenExpiry,
            avatarId);
    }

    public string FirstName { get; private set; } = null!;
    public string LastName { get; private set; } = null!;
    public Phone? Phone { get; private set; }
    public Email Email { get; private set; } = null!;
    public Password Password { get; private set; } = null!;
    public Guid? AvatarId { get; private set; }
    public IReadOnlyCollection<Role> Roles => _roles.AsReadOnly();
    public RefreshJwt? RefreshJwt { get; private set; }
    public Media? Avatar { get; }
    public UserEmailConfirmation? EmailConfirmation { get; private set; }

    public void ChangePassword(Password password) => Password = password;
    public void SetRefreshToken(RefreshJwt refreshJwt) => RefreshJwt = refreshJwt;
}
