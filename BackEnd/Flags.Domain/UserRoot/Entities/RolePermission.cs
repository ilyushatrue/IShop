namespace Flags.Domain.UserRoot.Entities;

public class RolePermission
{
    private RolePermission() { }
    private RolePermission(int roleId, int permissionId)
    {
        RoleId = roleId;
        PermissionId = permissionId;
    }

    public static RolePermission Create(int roleId, int permissionId) =>
        new(roleId, permissionId);

    public int RoleId { get; private set; }
    public int PermissionId { get; private set; }

    public Role? Role { get; private set; }
    public Permission? Permission { get; private set; }
}