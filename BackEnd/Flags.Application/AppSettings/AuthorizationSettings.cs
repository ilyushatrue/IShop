namespace Flags.Application.AppSettings;

public class AuthorizationSettings()
{
    public RolePermissions[] RolePermissions { get; set; } = null!;
}

public class RolePermissions
{
    public string Role { get; set; } = null!;
    public string[] Permissions { get; set; } = null!;
}
