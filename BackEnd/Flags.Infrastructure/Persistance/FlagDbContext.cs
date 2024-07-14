using Flags.Domain.MediaEntity;
using Flags.Domain.MenuItemEntity;
using Flags.Domain.ProductRoot;
using Flags.Domain.ProductRoot.Entities;
using Flags.Domain.UserRoot;
using Flags.Domain.UserRoot.Entities;
using Microsoft.EntityFrameworkCore;

namespace Flags.Infrastructure.Persistance;

public class FlagDbContext(
    DbContextOptions<FlagDbContext> options) : DbContext(options)
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(FlagDbContext).Assembly);
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
    public DbSet<UserFavoriteProduct> UserFavoriteProducts { get; set; } = null!;
    public DbSet<MenuItem> MenuItems { get; set; } = null!;
    public DbSet<RoleMenuItem> RoleMenuItems { get; set; } = null!;
}