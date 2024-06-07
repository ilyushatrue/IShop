using Microsoft.EntityFrameworkCore;
using Flags.Domain.MediaEntity;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Flags.Infrastructure.Persistance.Configurations;
public class MediaConfiguration : IEntityTypeConfiguration<Media>
{
    public void Configure(EntityTypeBuilder<Media> builder)
    {
        builder.Property(x => x.Id).ValueGeneratedNever();
    }
}
