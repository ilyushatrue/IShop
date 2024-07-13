using Flags.Domain.Enums;
using Microsoft.AspNetCore.Authorization;

namespace Flags.Infrastructure.Authorization;

public class PermissionRequirement(params PermissionFlag[] permissions) : IAuthorizationRequirement
{
    public PermissionFlag[] Permissions { get; set; } = permissions;
}