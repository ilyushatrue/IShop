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
            .AddCors(p => p.AddPolicy("CORS", build =>
            {
                build.WithOrigins(
                        "http://localhost:3000",
                        "http://185.128.105.115:3000",
                        "http://vlways.ru"
                    )
                    .AllowCredentials()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            }))
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
        }

        app.UseCors("CORS");
        app.UseMiddleware<ExceptionHandlingMiddleware>();
        app.UseHttpsRedirection();
        app.UseCookiePolicy(new CookiePolicyOptions
        {
            HttpOnly = HttpOnlyPolicy.Always,
        });
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapControllers();

        app.Run();
    }
}
