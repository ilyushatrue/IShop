using System.Text.Json.Serialization;
using Flags.Domain.Common.Models;
using Flags.Domain.MenuItemEntity;

namespace Flags.Domain.UserRoot.Entities;

public class Role : Entity<int>
{
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
    public ICollection<Permission>? Permissions { get; private set; }
    public ICollection<RolePermission>? RolePermissions { get; private set; }
    [JsonIgnore]
    public ICollection<User>? Users { get; private set; }
    public ICollection<RoleMenuItem>? RoleMenuItems { get; private set; }
    public ICollection<MenuItem>? MemuItems { get; private set; }
}