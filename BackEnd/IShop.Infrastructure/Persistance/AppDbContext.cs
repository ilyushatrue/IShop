using IShop.Application.Common;
using IShop.Domain.Common.Models;
using IShop.Domain.MediaEntity;
using IShop.Domain.MenuItemEntity;
using IShop.Domain.ProductRoot;
using IShop.Domain.ProductRoot.Entities;
using IShop.Domain.UserRoot;
using IShop.Domain.UserRoot.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace IShop.Infrastructure.Persistance;

public class AppDbContext(
    IDateTimeProvider dateTimeProvider,
    IHttpContextAccessor httpContextAccessor,
    IConfiguration _configuration,
    DbContextOptions<AppDbContext> options) : DbContext(options)
{
    private readonly DateTime _dateTimeUtcNow = dateTimeProvider.UtcNow;
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder
            .UseNpgsql(_configuration.GetConnectionString("DB"))
            .UseSnakeCaseNamingConvention();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
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

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        var entries = ChangeTracker
            .Entries()
            .Where(x => x.Entity is IAuditEntity);

        var addedEntries = entries.Where(e => e.State == EntityState.Added);
        var modifiedEntries = entries.Where(e => e.State == EntityState.Modified);

        var userId = httpContextAccessor.HttpContext?.User.Claims.FirstOrDefault(x => x.Type == "UserId")?.Value;
        Guid? userIdGuid = userId != null ? Guid.Parse(userId) : null;

        foreach (var entry in modifiedEntries)
        {
            var entity = (IAuditEntity)entry.Entity;
            entity.SetMetadata(
                entity.CreatedDate,
                _dateTimeUtcNow,
                entity.CreatedBy,
                userIdGuid);
        }
        foreach (var entry in addedEntries)
        {
            var entity = (IAuditEntity)entry.Entity;
            entity.SetMetadata(_dateTimeUtcNow, _dateTimeUtcNow, userIdGuid, userIdGuid);
        }

        return base.SaveChangesAsync(cancellationToken);
    }

    public async Task SyncronizeRecordsAsync<T, TId>(IEnumerable<T> overwriteData, CancellationToken cancellationToken)
        where TId : notnull
        where T : Entity<TId>
    {
        var dbSet = Set<T>();
        var dbIds = await dbSet.AsNoTracking().Select(e => e.Id).ToListAsync(cancellationToken);
        var newIds = overwriteData.Select(e => e.Id);

        var idsToDelete = dbIds.Except(newIds);
        var idsToAdd = newIds.Except(dbIds);
        var idsToUpdate = newIds.Intersect(dbIds);

        var changingDbEntities = await dbSet
            .Where(dbEntity => idsToDelete.Contains(dbEntity.Id) || idsToUpdate.Contains(dbEntity.Id))
            .ToListAsync(cancellationToken);

        var entitiesToDelete = changingDbEntities.Where(e => idsToDelete.Contains(e.Id));
        var entitiesToAdd = overwriteData.Where(e => idsToAdd.Contains(e.Id));
        var entitiesToUpdate = overwriteData.Where(e => idsToUpdate.Contains(e.Id));

        foreach (var updateEntity in entitiesToUpdate)
        {
            var existingEntity = changingDbEntities.Single(e => e.Id.Equals(updateEntity.Id));
            Entry(existingEntity).CurrentValues.SetValues(updateEntity);
        }

        RemoveRange(entitiesToDelete);
        AddRange(entitiesToAdd);
    }
}