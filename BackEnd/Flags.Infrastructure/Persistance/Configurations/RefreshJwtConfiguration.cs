using Flags.Domain.UserRoot.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Flags.Infrastructure.Persistance.Configurations;

public class RefreshJwtConfiguration : IEntityTypeConfiguration<RefreshJwt>
{
    public void Configure(EntityTypeBuilder<RefreshJwt> builder)
    {
        builder
            .Property(r => r.Id)
            .HasColumnName("user_id")
            .ValueGeneratedNever();
        builder
            .HasOne(r => r.User)
            .WithOne(u => u.RefreshJwt)
            .HasForeignKey<RefreshJwt>(r => r.Id);
    }
}
