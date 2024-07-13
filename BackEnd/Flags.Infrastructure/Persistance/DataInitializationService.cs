using Flags.Application.AppSettings;
using Flags.Application.Authentication.Common;
using Flags.Domain.Enums;
using Flags.Domain.MenuItemEntity;
using Flags.Domain.UserRoot;
using Flags.Domain.UserRoot.Entities;
using Flags.Infrastructure.Persistance;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;

public class DataInitializationService : IHostedService
{
    private readonly IServiceProvider _serviceProvider;

    public DataInitializationService(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        using var scope = _serviceProvider.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<FlagDbContext>();
        var adminSettings = scope.ServiceProvider.GetRequiredService<IOptions<AdminSettings>>().Value;
        var passwordHasher = scope.ServiceProvider.GetRequiredService<IPasswordHasher>();

        await EnsureAdminUserCreated(dbContext, adminSettings, passwordHasher);
        await CreateRoles(dbContext);
        await CreateMenuItems(dbContext);
        await CreateRoleMenuItems(dbContext);

        await dbContext.SaveChangesAsync(cancellationToken);
    }

    private async Task CreateRoleMenuItems(FlagDbContext dbContext)
    {
        var dbRoleMenuItems = await dbContext.RoleMenuItems.ToListAsync();
        dbContext.RemoveRange(dbRoleMenuItems);

        var adminMenuItems = Enum
            .GetValues<MenuItemEnum>()
            .Select(menuItemEnum => new RoleMenuItem((int)RoleFlag.Admin, (int)menuItemEnum))
            .ToList();

        List<RoleMenuItem> sellerMenuItems = [
            new((int)RoleFlag.Seller, (int)MenuItemEnum.Cart),
            new((int)RoleFlag.Seller, (int)MenuItemEnum.Products),
            new((int)RoleFlag.Seller, (int)MenuItemEnum.Profile),
            new((int)RoleFlag.Seller, (int)MenuItemEnum.Purchases),
        ];
        List<RoleMenuItem> userMenuItems = [
            new((int)RoleFlag.Visitor, (int)MenuItemEnum.Cart),
            new((int)RoleFlag.Visitor, (int)MenuItemEnum.Purchases),
        ];

        dbContext.RoleMenuItems.AddRange([.. adminMenuItems, .. sellerMenuItems, .. userMenuItems]);
    }

    private async Task CreateRoles(FlagDbContext dbContext)
    {
        var dbRoles = await dbContext.Roles.ToListAsync();
        dbContext.RemoveRange(dbRoles);
        var roles = Enum
          .GetValues<RoleFlag>()
          .Select(r => Role.Create((int)r, r.ToString()));
        dbContext.Roles.AddRange(roles);
    }

    private async Task CreateMenuItems(FlagDbContext dbContext)
    {
        var dbMenuItems = await dbContext.MenuItems.ToListAsync();

        List<MenuItem> menuItems = [
            MenuItem.Create((int)MenuItemEnum.Profile, "Profile", "Мой профиль", "/profile", "person", 1),
            MenuItem.Create((int)MenuItemEnum.Purchases, "Purchases", "Покупки", "/purchases", "sell", 2),
            MenuItem.Create((int)MenuItemEnum.Cart, "Cart", "Корзина", "/cart", "shopping_bag", 3),
            MenuItem.Create((int)MenuItemEnum.Products, "Products", "Товары", "/products", "inventory", 4),
            MenuItem.Create((int)MenuItemEnum.Users, "Users", "Пользователи", "/users", "people", 5),
            MenuItem.Create((int)MenuItemEnum.Settings, "Settings", "Настройки", "/settings", "settings", 6),
        ];

        dbContext.RemoveRange(dbMenuItems);
        dbContext.MenuItems.AddRange(menuItems);
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
