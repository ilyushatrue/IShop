using Flags.Application.AppSettings;
using Flags.Domain.MediaEntity;
using Flags.Domain.ProductRoot;
using Flags.Domain.ProductRoot.Entities;
using Flags.Domain.UserRoot;
using Flags.Domain.UserRoot.Entities;
using Flags.Infrastructure.Persistance.Configurations;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Flags.Infrastructure.Persistance;

public class FlagDbContext(
    IOptions<AuthorizationSettings> authorizationOptions,
    DbContextOptions<FlagDbContext> options) : DbContext(options)
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(FlagDbContext).Assembly);
        modelBuilder.ApplyConfiguration(new RolePermissionConfiguration(authorizationOptions.Value));
    }

    public DbSet<User> Users { get; set; } = null!;
    public DbSet<RefreshJwt> RefreshJwts { get; set; } = null!;
    public DbSet<Role> Roles { get; set; } = null!;
    public DbSet<RolePermission> RolePermissions { get; set; } = null!;
    public DbSet<Permission> Permissions { get; set; } = null!;
    public DbSet<Media> Media { get; set; } = null!;
    public DbSet<Product> Products { get; set; } = null!;
    public DbSet<ProductCategory> ProductCategories { get; set; } = null!;
    public DbSet<UserEmailConfirmation> UserEmailConfirmations { get; set; } = null!;
}