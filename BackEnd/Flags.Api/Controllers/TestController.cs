using Flags.Application.AppSettings;
using Flags.Application.Authentication.Common;
using Flags.Domain.Enums;
using Flags.Domain.UserRoot;
using Flags.Domain.UserRoot.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Flags.Api.Controllers;
[AllowAnonymous]
[Route("test")]
public class TestController(IOptions<AuthorizationSettings> authorizationSettings, IOptions<AdminSettings> adminSettings ,IPasswordHasher passwordHasher) : ApiController
{
    private readonly AuthorizationSettings _authorizationSettings = authorizationSettings.Value;
    [HttpGet]
    public async Task<IActionResult> Test()
    {
        await Task.CompletedTask;
        return Ok("test");
    }

    [HttpGet("1")]
    public IActionResult Test2()
    {
        var hash = passwordHasher.Generate(adminSettings.Value.Password);
        var user = Flags.Domain.UserRoot.User.Create(
            Guid.NewGuid(),
            adminSettings.Value.FirstName,
            adminSettings.Value.LastName,
            null,
            adminSettings.Value.Email,
            hash,
            RoleFlag.Admin,
            DateTime.Now,
            null
            );
        RolePermission[] i = _authorizationSettings.RolePermissions
                .SelectMany(rp => rp.Permissions
                    .Select(p => RolePermission.Create(
                        roleId: (int)Enum.Parse<RoleFlag>(rp.Role),
                        permissionId: (int)Enum.Parse<PermissionFlag>(p)
                    )))
                    .ToArray();

        return Ok(i);
    }

}