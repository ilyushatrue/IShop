using IShop.Domain.UserRoot;
using IShop.Domain.UserRoot.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace IShop.Infrastructure.Persistance.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.Property(u => u.Id).ValueGeneratedNever();

        builder
            .HasOne(u => u.EmailConfirmation)
            .WithOne(e => e.User)
            .HasForeignKey<UserEmailConfirmation>(e => e.Id);

        builder
            .HasOne(u => u.Avatar)
            .WithOne(a => a.User)
            .HasForeignKey<User>(x => x.AvatarId);

        builder
            .HasOne(u => u.RefreshJwt)
            .WithOne(r => r.User)
            .HasForeignKey<RefreshJwt>(r => r.Id)
            .OnDelete(DeleteBehavior.Cascade);

        builder
            .HasOne(u => u.Role)
            .WithMany(r => r.Users)
            .HasForeignKey(u => u.RoleId);

        builder.OwnsOne(u => u.Password, b =>
        {
            b.Property(x => x.Value).HasColumnName("password");
        });

        builder.OwnsOne(u => u.Phone, phone =>
        {
            phone.Property(x => x.Value).HasColumnName("phone");
            phone
                .HasIndex(x => x.Value)
                .IsUnique()
                .HasDatabaseName("ix_user_phone");
        });

        builder.OwnsOne(u => u.Email, b =>
        {
            b.Property(x => x.Value).HasColumnName("email");
            b.HasIndex(x => x.Value).IsUnique().HasDatabaseName("ix_user_email");
        });
    }
}