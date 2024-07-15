using Flags.Api.Common;
using Flags.Api.Common.Mapping;

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
