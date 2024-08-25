using IShop.Domain.UserRoot.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace IShop.Infrastructure.Persistance.Configurations;
public class UserCartProductConfiguration : IEntityTypeConfiguration<UserCartProduct>
{
    public void Configure(EntityTypeBuilder<UserCartProduct> builder)
    {
        builder.HasKey(x => new { x.UserId, x.ProductId });

        builder
            .HasOne(x => x.User)
            .WithMany(x => x.CartProducts)
            .HasForeignKey(x => x.UserId);

        builder
            .HasOne(x => x.Product)
            .WithMany(x => x.UserCartProducts)
            .HasForeignKey(x => x.ProductId);
    }
}
