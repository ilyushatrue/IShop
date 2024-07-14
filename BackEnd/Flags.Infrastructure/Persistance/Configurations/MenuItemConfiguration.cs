using Flags.Domain.MenuItemEntity;
using Flags.Domain.UserRoot.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Flags.Infrastructure.Persistance.Configurations;
public class MenuItemConfiguration : IEntityTypeConfiguration<MenuItem>
{
    public void Configure(EntityTypeBuilder<MenuItem> builder)
    {
        builder
            .HasMany(mi => mi.Roles)
            .WithMany(r => r.MemuItems)
            .UsingEntity<RoleMenuItem>(
                rb => rb.HasOne(rmi => rmi.Role).WithMany(r => r.RoleMenuItems).HasForeignKey(rmi => rmi.RoleId),
                lb => lb.HasOne(rmi => rmi.MenuItem).WithMany(mi => mi.RoleMenuItems).HasForeignKey(rmi => rmi.MenuItemId)
            );
    }
}
