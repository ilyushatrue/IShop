using Flags.Application.AppSettings;
using Flags.Application.Authentication.Common;
using Flags.Domain.Enums;
using Flags.Domain.MenuItemEntity;
using Flags.Domain.ProductRoot.Entities;
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
        var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var adminSettings = scope.ServiceProvider.GetRequiredService<IOptions<AdminSettings>>().Value;
        var passwordHasher = scope.ServiceProvider.GetRequiredService<IPasswordHasher>();

        using var transaction = await dbContext.Database.BeginTransactionAsync(cancellationToken);
        try
        {
            await EnsureAdminUserCreated(dbContext, adminSettings, passwordHasher, cancellationToken);
            await CreatePermissions(dbContext, cancellationToken);
            await CreateRoles(dbContext, cancellationToken);
            await CreateRolePermissions(dbContext, cancellationToken);
            await CreateMenuItems(dbContext, cancellationToken);
            await CreateRoleMenuItems(dbContext, cancellationToken);
            //await CreateProductCategories(dbContext, cancellationToken);

            await dbContext.SaveChangesAsync(cancellationToken);
            await transaction.CommitAsync(cancellationToken);
        }
        catch
        {
            await transaction.RollbackAsync(cancellationToken);
        }
    }

    private async Task CreateProductCategories(AppDbContext dbContext, CancellationToken cancellationToken)
    {
        List<ProductCategory> productCategories = [
            new ProductCategory("clothes", "Одежда и обувь", 1, null, "checkroom"),
            new ProductCategory("electronics", "Электроника", 2, null, "devices"),
            new ProductCategory("yard", "Дом и сад", 3, null, "deck"),
            new ProductCategory("child-care", "Детские товары", 4, null, "child_care")
        ];
        await dbContext.SyncronizeRecordsAsync<ProductCategory, int>(productCategories, cancellationToken);
    }

    private async Task CreateRolePermissions(AppDbContext dbContext, CancellationToken cancellationToken)
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

        var dbSet = await dbContext.RolePermissions.ToListAsync(cancellationToken);
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

    private static async Task CreatePermissions(AppDbContext dbContext, CancellationToken cancellationToken)
    {
        var permissions = Enum
            .GetValues<PermissionFlag>()
            .Select(p => Permission.Create((int)p, p.ToString()))
            .ToArray();

        await dbContext.SyncronizeRecordsAsync<Permission, int>(permissions, cancellationToken);
    }

    private async Task CreateRoleMenuItems(AppDbContext dbContext, CancellationToken cancellationToken)
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

        var dbSet = await dbContext.RoleMenuItems.ToListAsync(cancellationToken);
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

    private static async Task CreateRoles(AppDbContext dbContext, CancellationToken cancellationToken)
    {
        var roles = Enum
          .GetValues<RoleFlag>()
          .Select(r => Role.Create((int)r, r.ToString()));

        await dbContext.SyncronizeRecordsAsync<Role, int>(roles, cancellationToken);
    }

    private async Task CreateMenuItems(AppDbContext dbContext, CancellationToken cancellationToken)
    {
        List<MenuItem> menuItems = [
            MenuItem.Create((int)MenuItemEnum.Profile, "Profile", "Мой профиль", "/profile", "person", 1),
            MenuItem.Create((int)MenuItemEnum.Purchases, "Purchases", "Покупки", "/purchases", "sell", 2),
            MenuItem.Create((int)MenuItemEnum.Cart, "Cart", "Корзина", "/cart", "shopping_bag", 3),
            MenuItem.Create((int)MenuItemEnum.Products, "Products", "Товары", "/categories", "category", 4),
            MenuItem.Create((int)MenuItemEnum.Users, "Users", "Пользователи", "/users", "people", 5),
            MenuItem.Create((int)MenuItemEnum.Settings, "Settings", "Настройки", "/settings", "settings", 6),
        ];

        await dbContext.SyncronizeRecordsAsync<MenuItem, int>(menuItems, cancellationToken);
    }

    public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;

    private static async Task EnsureAdminUserCreated(AppDbContext dbContext, AdminSettings adminSettings, IPasswordHasher passwordHasher, CancellationToken cancellationToken)
    {
        var adminExists = await dbContext.Users.AnyAsync(u => u.Email.Value == adminSettings.Email, cancellationToken);
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