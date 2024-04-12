using Flags.Application.Common.Interfaces.Authentication;
using Flags.Application.Common.Interfaces.Services;
using Flags.Infrastructure.Authentication;
using Flags.Infrastructure.Services;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Flags.Application.Common.Interfaces.Persistance;
using Flags.Infrastructure.Persistance;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using Flags.Infrastructure.Persistance.Repositories;
using Microsoft.AspNetCore.Identity;

namespace Flags.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        ConfigurationManager configuration)
    {
        services
            .AddAuth(configuration)
            .AddPersistance();

        services.AddSingleton<IDateTimeProvider, DateTimeProvider>();

        return services;
    }

    public static IServiceCollection AddPersistance(
        this IServiceCollection services)
    {
        var apiPath = Environment.CurrentDirectory;
        var rootPath = Directory.GetParent(apiPath)!.FullName;
        var dbPath = rootPath + "\\Flags.Infrastructure\\Persistance\\DB\\flags.sql";

        services.AddDbContext<FlagDbContext>(options => options
            .UseSqlite($"Data Source={dbPath}")
            .UseSnakeCaseNamingConvention());

        services.AddScoped<IUserRepository, UserRepository>();

        return services;
    }


    public static IServiceCollection AddAuth(
        this IServiceCollection services,
        ConfigurationManager configuration)
    {
        var jwtSettings = new JwtSettings();
        configuration.Bind(JwtSettings.SectionName, jwtSettings);
        services.AddSingleton(Options.Create(jwtSettings));

        services.Configure<JwtSettings>(configuration.GetSection(JwtSettings.SectionName));
        services.AddSingleton<IPasswordHasher, PasswordHasher>();
        services.AddSingleton<IJwtTokenGenerator, JwtTokenGenerator>();
        services.AddAuthentication(defaultScheme: JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtSettings.Issuer,
                    ValidAudience = jwtSettings.Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Secret))
                };
                options.Events = new JwtBearerEvents()
                {
                    OnMessageReceived = context =>
                    {
                        context.Token = context.Request.Cookies["cookies"];
                        return Task.CompletedTask;
                    }
                };
            });
            
        return services;
    }
}
