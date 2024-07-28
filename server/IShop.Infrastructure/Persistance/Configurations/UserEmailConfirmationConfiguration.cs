using IShop.Domain.UserRoot.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace IShop.Infrastructure.Persistance.Configurations;
public class UserEmailConfirmationConfiguration : IEntityTypeConfiguration<UserEmailConfirmation>
{
    public void Configure(EntityTypeBuilder<UserEmailConfirmation> builder)
    {
        builder.Property(u => u.Id).ValueGeneratedNever();
    }
}
