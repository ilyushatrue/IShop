using Flags.Domain.UserRoot;
using Flags.Domain.UserRoot.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Flags.Infrastructure.Persistance.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.Property(u => u.Id).ValueGeneratedNever();

        builder
            .HasOne(u => u.Avatar)
            .WithOne(a => a.User)
            .HasForeignKey<User>(x => x.AvatarId);

        builder
            .HasMany(u => u.Roles)
            .WithMany(r => r.Users)
            .UsingEntity<UserRole>(
                lb => lb.HasOne(ur => ur.Role).WithMany().HasForeignKey(ur => ur.RoleId),
                rb => rb.HasOne(ur => ur.User).WithMany().HasForeignKey(ur => ur.UserId));

        builder.OwnsOne(u => u.Password, b =>
        {
            b.Property(x => x.Value).HasColumnName("password");
        });

        builder.OwnsOne(u => u.Phone, b =>
        {
            b.Property(x => x.Value).HasColumnName("phone");
            b.HasIndex(x => x.Value).IsUnique().HasDatabaseName("ix_user_phone");
        });

        builder.OwnsOne(u => u.Email, b =>
        {
            b.Property(x => x.Value).HasColumnName("email");
            b.HasIndex(x => x.Value).IsUnique().HasDatabaseName("ix_user_email");
        });
    }
}