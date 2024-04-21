using System.Runtime.CompilerServices;
using Flags.Domain.UserEntity;
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
            .HasMany(u => u.Roles)
            .WithMany(r => r.Users)
            .UsingEntity<UserRole>(
                lb => lb.HasOne(ur => ur.Role).WithMany().HasForeignKey(ur => ur.RoleId),
                rb => rb.HasOne(ur => ur.User).WithMany().HasForeignKey(ur => ur.UserId));

        builder.ComplexProperty(u => u.Password, b =>
        {
            b.Property(x => x.Value).HasColumnName("password");
        });
        builder.ComplexProperty(u => u.Phone, b =>
        {
            b.Property(x => x.Value).HasColumnName("phone");
        });
        builder.ComplexProperty(u => u.Email, b =>
        {
            b.Property(x => x.Value).HasColumnName("email");
        });
    }
}