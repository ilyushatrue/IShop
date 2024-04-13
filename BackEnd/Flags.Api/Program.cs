using Flags.Application;
using Flags.Infrastructure;
using Microsoft.AspNetCore.CookiePolicy;

namespace Flags.Api;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services
            .AddPresentation()
            .AddServices()
            .AddInfrastructure(builder.Configuration)
            .AddCors(p => p.AddPolicy("CORS", build =>
            {
                build.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader();
            }));

        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseCors("CORS");
        app.UseExceptionHandler("/error");
        app.UseHttpsRedirection();
        // app.UseCookiePolicy(new CookiePolicyOptions
        // {
        //     MinimumSameSitePolicy = SameSiteMode.Strict,
        //     HttpOnly = HttpOnlyPolicy.Always,
        //     Secure = CookieSecurePolicy.Always
        // });
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapControllers();
        app.Run();
    }
}
