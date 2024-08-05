using IShop.Api.Middlewares;
using IShop.Infrastructure;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.OpenApi.Models;
using System.Text.Json.Serialization;

namespace IShop.Api;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services
            .AddCors(options =>
            {
                options.AddPolicy("CORS_DEVELOPMENT", build =>
                    build
                        .WithOrigins("http://localhost:3000")
                        .AllowCredentials()
                        .AllowAnyMethod()
                        .AllowAnyHeader());

                options.AddPolicy("CORS_PRODUCTION", build =>
                    build
                        .WithOrigins("https://vlways.ru")
                        .AllowCredentials()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            })
            .AddPresentation()
            .AddInfrastructure(builder.Configuration)
            .AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
                options.JsonSerializerOptions.WriteIndented = true;
            });

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new OpenApiInfo { Title = "IShop API", Version = "v1" });
        });
        var app = builder.Build();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "IShop API V1");
            });
            app.UseCors("CORS_DEVELOPMENT");
        }
        else if (app.Environment.IsProduction())
        {
            app.UseHsts();
            app.UseCookiePolicy(new CookiePolicyOptions()
            {
                HttpOnly = HttpOnlyPolicy.Always,
                Secure = CookieSecurePolicy.Always,
                MinimumSameSitePolicy = SameSiteMode.Strict
            });
            app.UseCors("CORS_PRODUCTION");
        }
        app.UseHttpsRedirection();
        app.UseMiddleware<ExceptionHandlingMiddleware>();
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapControllers();

        app.Run();
    }
}
