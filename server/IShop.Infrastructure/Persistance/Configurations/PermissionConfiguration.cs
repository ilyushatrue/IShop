using IShop.Domain.UserRoot.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace IShop.Infrastructure.Persistance.Configurations;

public class PersistanceConfiguration : IEntityTypeConfiguration<Permission>
{
    public void Configure(EntityTypeBuilder<Permission> builder)
    {
        builder.Property(x => x.Id).ValueGeneratedNever();
    }
}
