﻿using IShop.Domain.UserRoot.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace IShop.Infrastructure.Persistance.Configurations;
public class UserFavoriteProductConfiguration : IEntityTypeConfiguration<UserFavoriteProduct>
{
    public void Configure(EntityTypeBuilder<UserFavoriteProduct> builder)
    {
        builder.HasKey(x => new { x.UserId, x.ProductId });

        builder
            .HasOne(x => x.User)
            .WithMany(x => x.FavoriteProducts)
            .HasForeignKey(x => x.UserId);

        builder
            .HasOne(x => x.Product)
            .WithMany(x => x.UserFavoriteProducts)
            .HasForeignKey(x => x.ProductId);
    }
}
