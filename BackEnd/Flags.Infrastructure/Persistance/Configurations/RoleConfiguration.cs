using Flags.Domain.Enums;
using Flags.Domain.UserRoot.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Flags.Infrastructure.Persistance.Configurations;

public class RoleConfiguration : IEntityTypeConfiguration<Role>
{
    public void Configure(EntityTypeBuilder<Role> builder)
    {
        builder.Property(u => u.Id).ValueGeneratedNever();

        builder
            .HasMany(r => r.Permissions)
            .WithMany(p => p.Roles)
            .UsingEntity<RolePermission>(
                lb => lb.HasOne<Permission>().WithMany().HasForeignKey(rp => rp.PermissionId),
                rb => rb.HasOne<Role>().WithMany().HasForeignKey(rp => rp.RoleId)
            );

        var roles = Enum
            .GetValues<RoleEnum>()
            .Select(r => Role.Create((int)r, r.ToString()));

        builder.HasData(roles);
    }
}