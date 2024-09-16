using IShop.Domain.Common.Models;
using IShop.Domain.Enums;
using IShop.Domain.MediaEntity;
using IShop.Domain.ProductRoot;
using IShop.Domain.UserRoot.Entities;
using IShop.Domain.UserRoot.ValueObjects;

namespace IShop.Domain.UserRoot;

public class User : AggregateRoot<Guid>
{
    private readonly List<UserFavoriteProduct> _favoriteProducts = [];
    private readonly List<UserCartProduct> _cartProducts = [];
    private User() : base(Guid.NewGuid()) { }
    private User(
        Guid id,
        string firstName,
        string lastName,
        string? phone,
        string email,
        string passwordHash,
        RoleEnum role,
        DateTime emailConfirmationTokenExpiry,
        Guid? avatarId = null) : this()
    {
        Id = id;
        Update(firstName, lastName, phone, email, role, avatarId);
        UpdatePassword(passwordHash);
        EmailConfirmation = new(id, Guid.NewGuid(), emailConfirmationTokenExpiry);
    }

    public void UpdatePassword(string passwordHash)
    {
        var password = Password.Create(passwordHash);
        Password = password;
    }

    public void Update(
        string firstName,
        string lastName,
        string? phone,
        string email,
        RoleEnum role,
        Guid? avatarId)
    {
        var emailObj = Email.Create(email);
        var phoneObj = phone is not null ? Phone.Create(phone) : null;
        FirstName = firstName;
        LastName = lastName;
        Phone = phoneObj;
        Email = emailObj;
        RoleId = (int)role;
        AvatarId = avatarId;
    }

    public static User Create(
        Guid id,
        string firstName,
        string lastName,
        string? phone,
        string email,
        string passwordHash,
        RoleEnum role,
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
            role,
            emailConfirmationTokenExpiry,
            avatarId);
    }

    public string FirstName { get; private set; } = null!;
    public string LastName { get; private set; } = null!;
    public int RoleId { get; private set; }
    public Phone? Phone { get; private set; }
    public Email Email { get; private set; } = null!;
    public Password Password { get; private set; } = null!;
    public Guid? AvatarId { get; private set; }

    public Role? Role { get; private set; }
    public RefreshJwt? RefreshJwt { get; private set; }
    public Media? Avatar { get; }
    public UserEmailConfirmation? EmailConfirmation { get; private set; }
    public IReadOnlyCollection<UserFavoriteProduct>? FavoriteProducts => _favoriteProducts.AsReadOnly();
    public IReadOnlyCollection<UserCartProduct>? CartProducts => _cartProducts.AsReadOnly();

    public void ChangePassword(Password password) => Password = password;
    public void SetRefreshToken(RefreshJwt refreshJwt) => RefreshJwt = refreshJwt;

    public void UpdateEmailConfirmationToken(DateTime expiryDateTime)
    {
        if (EmailConfirmation is null)
            throw new Exception("EmailConfirmation = null");

        EmailConfirmation.UpdateToken(expiryDateTime);
    }

    public void AddFavoriteProduct(Product product)
    {
        _favoriteProducts.Add(new(Id, product.Id));
    }
}
