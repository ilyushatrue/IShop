using Flags.Domain.Enums;
using Microsoft.AspNetCore.Authorization;

namespace Flags.Infrastructure.Authorization;

public class PermissionRequirement(PermissionEnum[] permissions) : IAuthorizationRequirement
{
    public PermissionEnum[] Permissions { get; set; } = permissions;
}