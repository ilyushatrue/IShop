using Flags.Application.AppSettings;
using Flags.Application.Authentication.Common;
using Flags.Domain.Common.Models;
using Flags.Domain.Enums;
using Flags.Domain.MenuItemEntity;
using Flags.Domain.UserRoot;
using Flags.Domain.UserRoot.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using System.Data;

namespace Flags.Infrastructure.Persistance;

public class DataInitializationService(IServiceProvider serviceProvider) : IHostedService
{
    public async Task StartAsync(CancellationToken cancellationToken)
    {
        using var scope = serviceProvider.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<FlagDbContext>();
        var adminSettings = scope.ServiceProvider.GetRequiredService<IOptions<AdminSettings>>().Value;
        var passwordHasher = scope.ServiceProvider.GetRequiredService<IPasswordHasher>();

        using var transaction = await dbContext.Database.BeginTransactionAsync(cancellationToken);
        try
        {
            await EnsureAdminUserCreated(dbContext, adminSettings, passwordHasher);
            await CreatePermissions(dbContext);
            await CreateRoles(dbContext);
            await CreateRolePermissions(dbContext);
            await CreateMenuItems(dbContext);
            await CreateRoleMenuItems(dbContext);

            await dbContext.SaveChangesAsync(cancellationToken);
            await transaction.CommitAsync(cancellationToken);
        }
        catch
        {
            await transaction.RollbackAsync(cancellationToken);
        }
    }

    private async Task CreateRolePermissions(FlagDbContext dbContext)
    {
        var adminPermissions = RolePermission.CreateRange(
            RoleFlag.Admin,
            PermissionFlag.Create,
            PermissionFlag.Update,
            PermissionFlag.Read,
            PermissionFlag.Delete);

        var visitorPermissions = RolePermission.CreateRange(
            RoleFlag.Visitor,
            PermissionFlag.Read);

        var sellerPermissions = RolePermission.CreateRange(
            RoleFlag.Seller,
            PermissionFlag.Read,
            PermissionFlag.Create,
            PermissionFlag.Update,
            PermissionFlag.Delete);

        RolePermission[] rolePermissions = [.. adminPermissions, .. visitorPermissions, .. sellerPermissions];

        var dbSet = await dbContext.RolePermissions.ToListAsync();
        var recordsToDelete = dbSet
            .Where(dbRecord => rolePermissions
                .All(newRecord =>
                    newRecord.PermissionId != dbRecord.PermissionId
                    || newRecord.RoleId != dbRecord.RoleId))
            .ToArray();
        var commonRecords = dbSet.Except(recordsToDelete).ToArray();
        var recordsToAdd = rolePermissions
            .Where(newRecord => commonRecords
                .All(dbRecord =>
                    newRecord.PermissionId != dbRecord.PermissionId
                    || newRecord.RoleId != dbRecord.RoleId))
            .ToArray();

        dbContext.RolePermissions.AddRange(recordsToAdd);
        dbContext.RolePermissions.RemoveRange(recordsToDelete);
    }

    private static async Task SyncronizeData<T, TId>(FlagDbContext dbContext, IEnumerable<T> overwriteData) where TId : notnull where T : Entity<TId>
    {
        var dbSet = await dbContext.Set<T>().ToListAsync();
        var recordsToDelete = dbSet
            .Where(dbRecord => overwriteData.All(newRecord => !newRecord.Id.Equals(dbRecord.Id)))
            .ToArray();
        var commonRecords = dbSet
            .Except(recordsToDelete)
            .OrderBy(x => x.Id)
            .ToArray();
        var recordsToAdd = overwriteData
            .Where(newRecord => commonRecords.All(dbRecord => !newRecord.Id.Equals(dbRecord.Id)))
            .ToArray();

        var updateData = overwriteData
            .Where(data => commonRecords.Any(cr => cr.Id.Equals(data.Id)));

        foreach (var record in commonRecords)
            dbContext.Entry(record).State = EntityState.Detached;

        dbContext.UpdateRange(updateData);
        dbContext.RemoveRange(recordsToDelete);
        dbContext.AddRange(recordsToAdd);
    }

    private async Task CreatePermissions(FlagDbContext dbContext)
    {
        var permissions = Enum
            .GetValues<PermissionFlag>()
            .Select(p => Permission.Create((int)p, p.ToString()))
            .ToArray();

        await SyncronizeData<Permission, int>(dbContext, permissions);
    }

    private async Task CreateRoleMenuItems(FlagDbContext dbContext)
    {
        var adminMenuItems = Enum
            .GetValues<MenuItemEnum>()
            .Select(menuItemEnum => new RoleMenuItem(RoleFlag.Admin, menuItemEnum))
            .ToList();

        List<RoleMenuItem> sellerMenuItems = [
            new(RoleFlag.Seller, MenuItemEnum.Cart),
            new(RoleFlag.Seller, MenuItemEnum.Products),
            new(RoleFlag.Seller, MenuItemEnum.Profile),
            new(RoleFlag.Seller, MenuItemEnum.Purchases),
        ];
        List<RoleMenuItem> userMenuItems = [
            new(RoleFlag.Visitor, MenuItemEnum.Cart),
            new(RoleFlag.Visitor, MenuItemEnum.Purchases),
        ];

        List<RoleMenuItem> menuItems = [.. adminMenuItems, .. sellerMenuItems, .. userMenuItems];

        var dbSet = await dbContext.RoleMenuItems.ToListAsync();
        var recordsToDelete = dbSet
            .Where(dbRecord => menuItems
                .All(newRecord =>
                    newRecord.MenuItemId != dbRecord.MenuItemId
                    || newRecord.RoleId != dbRecord.RoleId))
            .ToArray();
        var commonRecords = dbSet.Except(recordsToDelete).ToArray();
        var recordsToAdd = menuItems
            .Where(newRecord => commonRecords
                .All(dbRecord =>
                    newRecord.MenuItemId != dbRecord.MenuItemId
                    || newRecord.RoleId != dbRecord.RoleId))
            .ToArray();

        dbContext.RoleMenuItems.AddRange(recordsToAdd);
        dbContext.RoleMenuItems.RemoveRange(recordsToDelete);
    }

    private async Task CreateRoles(FlagDbContext dbContext)
    {
        var roles = Enum
          .GetValues<RoleFlag>()
          .Select(r => Role.Create((int)r, r.ToString()));

        await SyncronizeData<Role, int>(dbContext, roles);
    }

    private async Task CreateMenuItems(FlagDbContext dbContext)
    {
        List<MenuItem> menuItems = [
            MenuItem.Create((int)MenuItemEnum.Profile, "Profile", "Мой профиль", "/profile", "person", 1),
            MenuItem.Create((int)MenuItemEnum.Purchases, "Purchases", "Покупки", "/purchases", "sell", 2),
            MenuItem.Create((int)MenuItemEnum.Cart, "Cart", "Корзина", "/cart", "shopping_bag", 3),
            MenuItem.Create((int)MenuItemEnum.Products, "Products", "Товары", "/products", "inventory", 4),
            MenuItem.Create((int)MenuItemEnum.Users, "Users", "Пользователи", "/users", "people", 5),
            MenuItem.Create((int)MenuItemEnum.Settings, "Settings", "Настройки", "/settings", "settings", 6),
        ];

        await SyncronizeData<MenuItem, int>(dbContext, menuItems);
    }

    public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;

    private async Task EnsureAdminUserCreated(FlagDbContext dbContext, AdminSettings adminSettings, IPasswordHasher passwordHasher)
    {
        var adminExists = await dbContext.Users.AnyAsync(u => u.Email.Value == adminSettings.Email);
        if (adminExists) return;

        var passwordHash = passwordHasher.Generate(adminSettings.Password);

        var adminUser = User.Create(
            Guid.NewGuid(),
            adminSettings.FirstName,
            adminSettings.LastName,
            null,
            adminSettings.Email,
            passwordHash,
            RoleFlag.Admin,
            DateTime.UtcNow,
            null);

        adminUser.EmailConfirmation!.SetIsConfirmed();

        dbContext.Users.Add(adminUser);
    }
}