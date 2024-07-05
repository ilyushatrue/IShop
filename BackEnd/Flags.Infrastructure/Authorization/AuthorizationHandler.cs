using Flags.Application.Persistance.Repositories;
using Flags.Infrastructure.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;

namespace Flags.Infrastructure.Authorization;

public class PermissionAuthorizationHandler(
    IServiceScopeFactory scopeFactory
    ) : AuthorizationHandler<PermissionRequirement>
{
    protected override async Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        PermissionRequirement requirement)
    {
        var userIdStr = context.User.Claims.FirstOrDefault(
            c => c.Type == CustomClaims.USER_ID
        );
        if (userIdStr is null || !Guid.TryParse(userIdStr.Value, out var userId))
        {
            return;
        }

        using var scope = scopeFactory.CreateScope();
        var userRepository = scope.ServiceProvider.GetRequiredService<IUserRepository>();

        var permissions = await userRepository.GetPermissionsAsync(userId);

        if (permissions.Intersect(requirement.Permissions).Any())
        {
            context.Succeed(requirement);
        }
    }
}
