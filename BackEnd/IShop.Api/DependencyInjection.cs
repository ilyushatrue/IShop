using IShop.Api.Common;
using IShop.Api.Common.Mapping;

namespace IShop.Api;

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
