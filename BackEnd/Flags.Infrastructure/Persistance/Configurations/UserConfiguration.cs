using Flags.Domain.User.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Flags.Infrastructure.Persistance.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.Property(u => u.Id).ValueGeneratedNever();
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