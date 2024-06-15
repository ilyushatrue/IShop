﻿using Flags.Domain.Common.Models;
using Flags.Domain.MediaEntity;
using Flags.Domain.UserEntity.ValueObjects;
using Flags.Domain.UserRoot.Entities;

namespace Flags.Domain.UserEntity;

public class User : AggregateRoot<Guid>
{
    private readonly List<Role> _roles = [];
    private User() : base(Guid.NewGuid()) { }
    private User(
        Guid id,
        string firstName,
        string lastName,
        Phone phone,
        Email email,
        Password password,
        Guid? avatarId = null) : this()
    {
        Id = id;
        FirstName = firstName;
        LastName = lastName;
        Phone = phone;
        Email = email;
        Password = password;
        AvatarId = avatarId;
    }

    public static User Create(
        Guid id,
        string firstName,
        string lastName,
        Phone phone,
        Email email,
        Password password,
        Guid? avatarId)
    {
        return new User(
            id,
            firstName,
            lastName,
            phone,
            email,
            password,
            avatarId);
    }
    public string FirstName { get; private set; } = null!;
    public string LastName { get; private set; } = null!;
    public Phone Phone { get; private set; } = null!;
    public Email Email { get; private set; } = null!;
    public Password Password { get; private set; } = null!;
    public Guid? AvatarId { get; private set; }
    public IReadOnlyCollection<Role> Roles => _roles.AsReadOnly();
    public RefreshJwt? RefreshJwt { get; }
    public Media? Avatar { get; }
}
