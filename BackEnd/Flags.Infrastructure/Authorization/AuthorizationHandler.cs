using System.IdentityModel.Tokens.Jwt;
using Flags.Application.Common.Interfaces.Persistance;
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
        using var scope = scopeFactory.CreateScope();
        var userRepository = scope.ServiceProvider.GetRequiredService<IUserRepository>();

        var userIdStr = context.User.Claims.FirstOrDefault(
            c => c.Type == JwtRegisteredClaimNames.Sub
        );
        if (userIdStr is null || !Guid.TryParse(userIdStr.Value, out var userId))
        {
            return;
        }
        var permissions = await userRepository.GetPermissionsAsync(userId);

        if (permissions.Intersect(requirement.Permissions).Any())
        {
            context.Succeed(requirement);
        }
    }
}
