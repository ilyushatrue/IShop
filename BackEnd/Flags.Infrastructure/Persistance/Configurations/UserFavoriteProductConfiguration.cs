using Flags.Domain.UserRoot.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Flags.Infrastructure.Persistance.Configurations;
public class UserFavoriteProductConfiguration : IEntityTypeConfiguration<UserFavoriteProduct>
{
    public void Configure(EntityTypeBuilder<UserFavoriteProduct> builder)
    {
        builder.HasKey(x => new { x.UserId, x.ProductId });
    }
}
