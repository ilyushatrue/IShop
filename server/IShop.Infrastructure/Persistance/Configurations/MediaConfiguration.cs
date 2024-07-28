using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using IShop.Domain.MediaEntity;

namespace IShop.Infrastructure.Persistance.Configurations;
public class MediaConfiguration : IEntityTypeConfiguration<Media>
{
    public void Configure(EntityTypeBuilder<Media> builder)
    {
        builder.Property(x => x.Id).ValueGeneratedNever();
    }
}
