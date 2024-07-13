using Flags.Domain.Enums;
using Flags.Domain.UserRoot.Entities;
using Flags.Application.AppSettings;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Flags.Infrastructure.Persistance.Configurations;

public class RolePermissionConfiguration(
    AuthorizationSettings authorizationSettings
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
        return authorizationSettings.RolePermissions
            .SelectMany(rp => rp.Permissions
                .Select(p => RolePermission.Create(
                    roleId: (int)Enum.Parse<RoleFlag>(rp.Role),
                    permissionId: (int)Enum.Parse<PermissionFlag>(p)
                )))
                .ToArray();
    }
}