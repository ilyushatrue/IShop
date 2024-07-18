using Flags.Application.Products.Queries;
using Flags.Application.Users.Command;
using Flags.Application.Users.Queries;
using Flags.Contracts.Products;
using Flags.Domain.Common.Exceptions;
using Flags.Infrastructure.Authentication;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Flags.Domain.Enums;
using Flags.Api.Common;
using Flags.Contracts.Users;
using Flags.Contracts;
using Flags.Application.MenuItems.Queries;
using Flags.Contracts.MenuItems;
using Flags.Domain.UserRoot;

namespace Flags.Api.Controllers;

[Route("users")]
[Authorize(Policy = CustomPolicies.ADMIN_POLICY)]
public class UsersController(
    IMapper mapper,
    IGetAllUsersQueryHandler getAllUsersQueryHandler,
    IGetUserByIdQueryHandler getUserByIdQueryHandler,
    IEditUserDataCommandHandler editUserDataCommandHandler,
    IGetAllProductCategoriesQueryHandler getAllProductCategoriesQueryHandler,
    IGetMenuItemsByRoleQueryHandler getMenuItemsByRoleQueryHandler,
    CookieManager cookieManager
) : ApiController
{
    [HttpGet]
    public async Task<IActionResult> GetAllUsersAsync(CancellationToken cancellationToken)
    {
        var result = await getAllUsersQueryHandler.Handle(cancellationToken);
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var result = await getUserByIdQueryHandler.Handle(id, cancellationToken);
        return Ok(result);
    }

    [AllowAnonymous]
    [HttpGet("current")]
    public async Task<IActionResult> GetCurrent(CancellationToken cancellationToken)
    {
        var userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "UserId")?.Value;

        var userRoleId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "RoleId")?.Value;
        var userRole = userRoleId == null ? RoleFlag.Visitor : Enum.Parse<RoleFlag>(userRoleId);
        var getMenuItemsByRoleQuery = new GetMenuItemsByRoleQuery(userRole);

        var menuItemsTask = getMenuItemsByRoleQueryHandler.Handle(getMenuItemsByRoleQuery, cancellationToken);
        var categoriesTask = getAllProductCategoriesQueryHandler.Handle(cancellationToken);

        Task<User>? userTask = null;
        if (userId != null)
        {
            userTask = getUserByIdQueryHandler.Handle(Guid.Parse(userId), cancellationToken);
        }

        var initialResponse = new InitialResponse()
        {
            User = userId == null ? null : mapper.Map<UserInitialDto>(await userTask!),
            MenuItems = mapper.Map<IEnumerable<MenuItemDto>>(await menuItemsTask),
            ProductCategories = mapper.Map<IEnumerable<ProductCategoryDto>>(await categoriesTask),
        };
        return Ok(initialResponse);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateUserData([FromBody] EditUserDataCommand user, CancellationToken cancellationToken)
    {
        var role = Enum.Parse<RoleFlag>(HttpContext.User.Claims.FirstOrDefault(x => x.Type == "RoleId")!.Value);
        var command = new EditUserDataCommand(user.FirstName, user.LastName, user.Email, user.Phone, role, user.AvatarId);
        var result = await editUserDataCommandHandler.Handle(command, cancellationToken);
        cookieManager.SetUserCookies(result);
        return Ok();
    }
}