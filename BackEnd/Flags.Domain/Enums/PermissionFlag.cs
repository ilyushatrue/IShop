namespace Flags.Domain.Enums;

[Flags]
public enum PermissionFlag
{
    Read = 1,
    Create = 2,
    Update = 4,
    Delete = 8,
}