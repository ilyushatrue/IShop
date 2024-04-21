using System.IdentityModel.Tokens.Jwt;
using Flags.Infrastructure.Persistance.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualBasic;

namespace Flags.Infrastructure.Authorization;

public class PermissionAuthorizationHandler(
    UserRepository userRepository
    ) : AuthorizationHandler<PermissionRequirement>
{
    protected override async Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        PermissionRequirement requirement)
    {
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
