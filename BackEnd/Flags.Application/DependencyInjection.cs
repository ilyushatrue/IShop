using MediatR;
using Microsoft.Extensions.DependencyInjection;
namespace Flags.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        services.AddMediatR(typeof(DependencyInjection).Assembly);
        return services;
    }
}
