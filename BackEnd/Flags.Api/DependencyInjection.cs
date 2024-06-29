using Flags.Api.Common.Mapping;

namespace Flags.Api;

public static class DependencyInjection
{
    public static IServiceCollection AddPresentation(this IServiceCollection services)
    {
        services.AddControllers();
        //services.AddSingleton<ProblemDetailsFactory, FlagsProblemDetailsFactory>();        
        services.AddMapping();
        return services;
    }
}
