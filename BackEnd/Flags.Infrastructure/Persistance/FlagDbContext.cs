using Flags.Domain.UserEntity;
using Flags.Domain.UserRoot.Entities;
using Flags.Infrastructure.Authorization;
using Flags.Infrastructure.Persistance.Configurations;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Flags.Infrastructure.Persistance;

public class FlagDbContext(
	DbContextOptions<FlagDbContext> options,
	IOptions<AuthorizationOptions> authorizationOptions) : DbContext(options)
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
	public DbSet<Permission> Permissions { get; set; } = null!;

}