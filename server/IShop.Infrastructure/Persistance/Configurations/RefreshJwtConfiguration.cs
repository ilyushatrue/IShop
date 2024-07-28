using IShop.Domain.UserRoot.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace IShop.Infrastructure.Persistance.Configurations;

public class RefreshJwtConfiguration : IEntityTypeConfiguration<RefreshJwt>
{
    public void Configure(EntityTypeBuilder<RefreshJwt> builder)
    {
        builder
            .Property(r => r.Id)
            .HasColumnName("user_id")
            .ValueGeneratedNever();
    }
}
