

using Flags.Domain.Enums;
using Flags.Domain.UserRoot.Entities;
using Flags.Infrastructure.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Flags.Infrastructure.Persistance.Configurations;

public class RolePermissionConfiguration(
    AuthorizationOptions authorization
    ) : IEntityTypeConfiguration<RolePermission>
{
    public void Configure(EntityTypeBuilder<RolePermission> builder)
    {
        builder.ToTable("role_permissions");
        builder.HasKey(rp => new { rp.RoleId, rp.PermissionId });
        builder.HasData(ParseRolePermissions());
    }

    private RolePermission[] ParseRolePermissions()
    {
        return authorization.RolePermissions
            .SelectMany(rp => rp.Permissions
                .Select(p => RolePermission.Create(
                    roleId: (int)Enum.Parse<RoleEnum>(rp.Role),
                    permissionId: (int)Enum.Parse<PermissionEnum>(p)
                )))
                .ToArray();
    }
}