using Flags.Infrastructure.Authentication;
using Flags.Infrastructure.Services;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Flags.Infrastructure.Persistance;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using Flags.Infrastructure.Persistance.Repositories;
using Flags.Domain.Enums;
using Flags.Infrastructure.Authorization;
using Microsoft.AspNetCore.Authorization;
using Flags.Application.AppSettings;
using Flags.Infrastructure.Services.Auth;
using Flags.Infrastructure.Services.Images;
using Flags.Infrastructure.Services.Users;
using Flags.Application.Authentication.Common;
using Flags.Application.Authentication.Commands.Logout;
using Flags.Application.Authentication.Commands.RefreshJwt;
using Flags.Application.Authentication.Commands.Register;
using Flags.Application.Users.Queries;
using Flags.Application.Users.Command;
using Flags.Application.Images.Queries;
using Flags.Application.Images.Commands;
using Flags.Application.Common;
using Flags.Application.Products.Queries;
using Flags.Infrastructure.Services.Products;
using Flags.Application.Products.Commands;
using Flags.Application.Emails;
using Flags.Infrastructure.Services.Emails;
using Flags.Application.Authentication.Commands.ResetPassword;
using Flags.Infrastructure.Services.Auth.ResetPassword;
using Flags.Application.Persistance.Repositories;
using Flags.Application.Persistance;
using Flags.Application.Authentication.Commands.ConfirmEmail;
using Flags.Application.Products.Commands.MakeProductFavorite;
using Flags.Application.MenuItems.Queries;
using Flags.Infrastructure.Services.MenuItems;
using Flags.Application.Authentication.Queries.Login;

namespace Flags.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        ConfigurationManager configuration)
    {
        services
            .AddAuth(configuration)
            .AddPersistance()
            .AddServices();

        services.AddSingleton<IDateTimeProvider, DateTimeProvider>();

        return services;
    }

    public static IServiceCollection AddPersistance(
        this IServiceCollection services)
    {
        var apiPath = Environment.CurrentDirectory;
        var rootPath = Directory.GetParent(apiPath)!.FullName;
        var dbPath = rootPath + "\\Flags.Infrastructure\\Persistance\\DB\\flags.sql";

        services.AddDbContext<AppDbContext>(options => options
            .UseSqlite($"Data Source={dbPath}")
            .UseSnakeCaseNamingConvention());
        services.AddHostedService<DataInitializationService>();

        services.AddScoped<IDbManager, DbManager>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IRefreshJwtRepository, RefreshJwtRepository>();
        services.AddScoped<IMediaRepository, MediaRepository>();
        services.AddScoped<IProductRepository, ProductRepository>();
        services.AddScoped<IUserEmailConfirmationRepository, UserEmailConfirmationRepository>();
        services.AddScoped<IProductCategoryRepository, ProductCategoryRepository>();
        services.AddScoped<IUserFavoriteProductRepository, UserFavoriteProductRepository>();
        services.AddScoped<IMenuItemRepository, MenuItemRepository>();
        return services;
    }

    public static IServiceCollection AddServices(
    this IServiceCollection services)
    {
        #region C
        services.AddScoped<IConfirmEmailCommandHandler, ConfirmEmailCommandHandler>();
        services.AddScoped<ICreateImageCommandHandler, CreateImageCommandHandler>();
        services.AddScoped<ICreateProductCategoryCommandHandler, CreateProductCategoryCommandHandler>();
        services.AddScoped<ICreateProductCommandHandler, CreateProductCommandHandler>();
        #endregion
        #region D
        services.AddScoped<IDeleteProductsByIdCommandHandler, DeleteProductsByIdCommandHandler>();
        #endregion
        #region E
        services.AddScoped<IEditUserDataCommandHandler, EditUserDataCommandHandler>();
        services.AddScoped<IEmailSender, EmailSender>();
        #endregion
        #region G
        services.AddScoped<IGetAllProductCategoriesQueryHandler, GetAllProductCategoriesQueryHandler>();
        services.AddScoped<IGetAllProductsQueryHandler, GetAllProductsQueryHandler>();
        services.AddScoped<IGetAllUsersQueryHandler, GetAllUsersQueryHandler>();
        services.AddScoped<IGetMenuItemsByRoleQueryHandler, GetMenuItemsByRoleQueryHandler>();
        services.AddScoped<IGetImageByIdQueryHandler, GetImageByIdQueryHandler>();
        services.AddScoped<IGetProductsByCategoryQueryHandler, GetProductsByCategoryQueryHandler>();
        services.AddScoped<IGetUserByIdQueryHandler, GetUserByIdQueryHandler>();
        #endregion
        #region L
        services.AddScoped<ILoginByEmailQueryHandler, LoginByEmailQueryHandler>();
        services.AddScoped<ILoginByPhoneQueryHandler, LoginByPhoneQueryHandler>();
        services.AddScoped<ILogoutCommandHandler, LogoutCommandHandler>();
        #endregion
        #region M
        services.AddScoped<IMakeProductFavoriteCommandHandler, MakeProductFavoriteCommandHandler>();
        services.AddScoped<IMakeProductRangeFavoriteCommandHandler, MakeProductRangeFavoriteCommandHandler>();
        #endregion
        #region R
        services.AddScoped<IRefreshJwtCommandHandler, RefreshJwtCommandHandler>();
        services.AddScoped<IRegisterCommandHandler, RegisterCommandHandler>();
        services.AddScoped<IResetPasswordCommandHandler, ResetPasswordCommandHandler>();
        #endregion
        #region S
        services.AddScoped<ISendEmailConfirmEmailCommandHandler, SendEmailConfirmEmailCommandHandler>();
        services.AddScoped<ISendResetPasswordEmailCommandHandler, SendResetPasswordEmailCommandHandler>();
        services.AddScoped<ISendResetPasswordFormCommandHandler, SendResetPasswordFormCommandHandler>();
        services.AddScoped<ISyncProductCategoriesCommandHandler, SyncProductCategoriesCommandHandler>();
        #endregion
        #region U
        services.AddScoped<IUpdateProductCommandHandler, UpdateProductCommandHandler>();
        #endregion
        return services;
    }

    public static IServiceCollection AddAuth(
        this IServiceCollection services,
        ConfigurationManager configuration)
    {
        var jwtSettings = new JwtSettings();
        configuration.Bind(nameof(JwtSettings), jwtSettings);
        services.AddSingleton(Options.Create(jwtSettings));
        services.Configure<RefreshJwtSettings>(configuration.GetSection(nameof(RefreshJwtSettings)));
        services.Configure<FileSettings>(configuration.GetSection(nameof(FileSettings)));
        services.Configure<EmailSettings>(configuration.GetSection(nameof(EmailSettings)));
        services.Configure<ClientSettings>(configuration.GetSection(nameof(ClientSettings)));
        services.Configure<HostSettings>(configuration.GetSection(nameof(HostSettings)));
        services.Configure<AuthenticationSettings>(configuration.GetSection(nameof(AuthenticationSettings)));
        services.Configure<MenuSettings>(configuration.GetSection(nameof(MenuSettings)));
        services.Configure<AuthorizationSettings>(configuration.GetSection(nameof(AuthorizationSettings)));
        services.Configure<AdminSettings>(configuration.GetSection(nameof(AdminSettings)));
        services.AddSingleton<IPasswordHasher, PasswordHasher>();
        services.AddSingleton<IJwtTokenGenerator, JwtTokenGenerator>();
        services.AddAuthentication(defaultScheme: JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                var validationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtSettings.Issuer,
                    ValidAudience = jwtSettings.Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Secret))
                };
                options.TokenValidationParameters = validationParameters;
                options.Events = new JwtBearerEvents()
                {
                    OnMessageReceived = context =>
                    {
                        context.Token = context.Request.Cookies["jwt-access-token"];
                        return Task.CompletedTask;
                    },
                };
            });


        services.AddSingleton<IAuthorizationHandler, PermissionAuthorizationHandler>();
        services.AddAuthorizationBuilder()
            .AddPolicy(CustomPolicies.ADMIN_POLICY, policy => policy
                .RequireRole(RoleFlag.Admin.ToString()))
            .AddPolicy(CustomPolicies.EDIT_POLICY, policy => policy
                .AddRequirements(new PermissionRequirement(
                    PermissionFlag.Create,
                    PermissionFlag.Read,
                    PermissionFlag.Delete,
                    PermissionFlag.Update)));
        return services;
    }
}
