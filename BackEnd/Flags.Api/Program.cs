using Flags.Infrastructure;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;

namespace Flags.Api;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services
            .AddCors(p => p.AddPolicy("CORS", build =>
            {
                build.WithOrigins("http://localhost:3000")
                    .AllowCredentials()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            }))
            .AddPresentation()
            .AddInfrastructure(builder.Configuration);

        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new OpenApiInfo { Title = "Flags API", Version = "v1" });
        });
        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Flags API V1");
            });
        }

        app.UseCors("CORS");
        app.UseExceptionHandler("/error");
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
