using Flags.Domain.User.Entities;
using Microsoft.EntityFrameworkCore;

namespace Flags.Infrastructure.Persistance;

public class FlagDbContext(DbContextOptions<FlagDbContext> options) : DbContext(options)
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
	
}