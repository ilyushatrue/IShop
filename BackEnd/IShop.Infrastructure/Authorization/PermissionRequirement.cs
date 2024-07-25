using IShop.Domain.Enums;
using Microsoft.AspNetCore.Authorization;

namespace IShop.Infrastructure.Authorization;

public class PermissionRequirement(params PermissionEnum[] permissions) : IAuthorizationRequirement
{
    public PermissionEnum[] Permissions { get; set; } = permissions;
}