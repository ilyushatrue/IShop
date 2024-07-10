using Flags.Application.AppSettings;
using Flags.Domain.Enums;
using Flags.Domain.UserRoot.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Flags.Api.Controllers;
[AllowAnonymous]
[Route("test")]
public class TestController(IOptions<AuthorizationSettings> authorizationSettings) : ApiController
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