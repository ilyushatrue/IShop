using Flags.Domain.Enums;
using Flags.Domain.UserRoot.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Flags.Infrastructure.Persistance.Configurations;

public class PersistanceConfiguration : IEntityTypeConfiguration<Permission>
{
    public void Configure(EntityTypeBuilder<Permission> builder)
    {
        builder.Property(x => x.Id).ValueGeneratedNever();
        var permissions = Enum
            .GetValues<PermissionFlag>()
            .Select(p => Permission.Create((int)p, p.ToString()));

        builder.HasData(permissions);
    }
}
