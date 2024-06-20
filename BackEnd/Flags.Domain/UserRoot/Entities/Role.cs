using Flags.Domain.Common.Models;

namespace Flags.Domain.UserRoot.Entities;

public class Role : Entity<int>
{
    private readonly List<Permission> _permissions = [];
    private readonly List<User> _users = [];

    private Role() { }
    private Role(int id, string name) : base(id)
    {
        Name = name;
    }
    public static Role Create(int id, string name)
    {
        return new Role(id, name);
    }

    public string Name { get; private set; } = null!;
    public IReadOnlyCollection<Permission> Permissions => _permissions.AsReadOnly();
    public IReadOnlyCollection<User> Users => _users.AsReadOnly();
}