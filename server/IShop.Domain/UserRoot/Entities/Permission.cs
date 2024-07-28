using IShop.Domain.Common.Models;

namespace IShop.Domain.UserRoot.Entities;

public class Permission : Entity<int>
{
    private readonly List<Role> _roles = [];
    private Permission() { }
    private Permission(int id, string name) : base(id) => Update(name);

    public static Permission Create(int id, string name)
    {
        return new Permission(id, name);
    }
    public void Update(string name)
    {
        Name = name;
    }
    public string Name { get; private set; } = null!;
    public IReadOnlyCollection<Role> Roles => _roles.AsReadOnly();
    public IReadOnlyCollection<RolePermission>? RolePermissions { get; private set; }
}