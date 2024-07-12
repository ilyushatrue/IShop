using Flags.Domain.UserRoot.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Flags.Infrastructure.Persistance.Configurations;
public class RoleMenuItemConfiguration : IEntityTypeConfiguration<RoleMenuItem>
{
    public void Configure(EntityTypeBuilder<RoleMenuItem> builder)
    {
        builder.HasKey(x => new { x.RoleId, x.MenuItemId });
    }
}
