using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Flags.Infrastructure.Persistance;

public class UserDbContext : IdentityDbContext
{

	public UserDbContext(DbContextOptions<UserDbContext> options) : base(options)
	{

	}
}