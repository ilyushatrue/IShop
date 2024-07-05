using Flags.Domain.UserRoot.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Flags.Infrastructure.Persistance.Configurations;
public class UserEmailConfirmationConfiguration : IEntityTypeConfiguration<UserEmailConfirmation>
{
    public void Configure(EntityTypeBuilder<UserEmailConfirmation> builder)
    {
        builder.Property(u => u.Id).ValueGeneratedNever();
    }
}
