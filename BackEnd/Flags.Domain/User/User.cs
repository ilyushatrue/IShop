using Flags.Domain.Common.Models;
using Flags.Domain.User.ValueObjects;

namespace Flags.Domain.User.Entities;

public class User : AggregateRoot
{
    private User() : base(Guid.NewGuid())
    {

    }
    private User(
        string firstName,
        string lastName,
        Phone phone,
        Email email,
        Password password) : this()
    {
        FirstName = firstName;
        LastName = lastName;
        Phone = phone;
        Email = email;
        Password = password;
    }

    public static User Create(
        string firstName,
        string lastName,
        Phone phone,
        Email email,
        Password password)
    {
        return new User(
            firstName,
            lastName,
            phone,
            email,
            password);
    }
    public string FirstName { get; private set; } = null!;
    public string LastName { get; private set; } = null!;
    public Phone Phone { get; private set; } = null!;
    public Email Email { get; private set; } = null!;
    public Password Password { get; private set; } = null!;
}
