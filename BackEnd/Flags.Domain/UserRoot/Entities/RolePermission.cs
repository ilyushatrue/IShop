using Flags.Domain.Enums;

namespace Flags.Domain.UserRoot.Entities;

public class RolePermission
{
    private RolePermission() { }
    private RolePermission(RoleFlag role, PermissionFlag permission)
    {
        RoleId = (int)role;
        PermissionId = (int)permission;
    }

    public static RolePermission Create(RoleFlag role, PermissionFlag permission) =>
        new(role, permission);
    public static IEnumerable<RolePermission> CreateRange(RoleFlag role, params PermissionFlag[] permissions) =>
        permissions.Select(permission => new RolePermission(role, permission));


    public int RoleId { get; private set; }
    public int PermissionId { get; private set; }

    public Role? Role { get; private set; }
    public Permission? Permission { get; private set; }
}