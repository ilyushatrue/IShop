using Flags.Api.Common.Mapping;
using Flags.Infrastructure.Services.Cookies;

namespace Flags.Api;

public static class DependencyInjection
{
    public static IServiceCollection AddPresentation(this IServiceCollection services)
    {
        services.AddControllers();
        services.AddMapping();
        services.AddHttpContextAccessor();
        services.AddScoped<CookieManager>();
        return services;
    }
}
