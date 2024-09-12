using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using IShop.Contracts;
using IShop.Api.Common;
using IShop.Application.Users.Command;
using IShop.Application.Users.Queries;
using IShop.Application.MenuItems.Queries;
using IShop.Application.Products.Queries;
using IShop.Domain.Enums;
using IShop.Domain.UserRoot;
using IShop.Contracts.MenuItems;
using IShop.Contracts.Users;
using IShop.Contracts.Products;
using IShop.Infrastructure.Authentication;

namespace IShop.Api.Controllers;

[Route("users")]
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
    [Authorize(Policy = CustomPolicies.ADMIN_POLICY)]
    [HttpGet]
    public async Task<IActionResult> GetAllUsersAsync(CancellationToken cancellationToken)
    {
        var result = await getAllUsersQueryHandler.Handle(cancellationToken);
        return Ok(result);
    }

    [Authorize(Policy = CustomPolicies.ADMIN_POLICY)]
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
        string? userId = null;
        var userRole = RoleEnum.Visitor;
        if (HttpContext.Request.Cookies["jwt-access-token"] != null)
        {
            userId = HttpContext.Request.Cookies["user-id"];
            var userRoleId = HttpContext.Request.Cookies["user-role"]!;
            userRole = Enum.Parse<RoleEnum>(userRoleId);
        }
        var getMenuItemsByRoleQuery = new GetMenuItemsByRoleQuery(userRole);

        var menuItems = await getMenuItemsByRoleQueryHandler.Handle(getMenuItemsByRoleQuery, cancellationToken);
        var categories = await getAllProductCategoriesQueryHandler.Handle(cancellationToken);

        Task<User>? userTask = null;
        if (userId != null)
        {
            userTask = getUserByIdQueryHandler.Handle(Guid.Parse(userId), cancellationToken);
        }

        var initialResponse = new InitialResponse()
        {
            User = userId == null ? null : mapper.Map<UserInitialDto>(await userTask!),
            MenuItems = mapper.Map<IEnumerable<MenuItemDto>>(menuItems),
            ProductCategories = mapper.Map<IEnumerable<ProductCategoryDto>>(categories),
        };
        return Ok(initialResponse);
    }

    [Authorize(Policy = CustomPolicies.EDIT_POLICY)]
    [HttpPut]
    public async Task<IActionResult> UpdateUserData([FromBody] EditUserDataCommand user, CancellationToken cancellationToken)
    {
        var role = Enum.Parse<RoleEnum>(HttpContext.User.Claims.FirstOrDefault(x => x.Type == "RoleId")!.Value);
        var command = new EditUserDataCommand(user.FirstName, user.LastName, user.Email, user.Phone, role, user.AvatarId);
        var result = await editUserDataCommandHandler.Handle(command, cancellationToken);
        cookieManager.SetUserCookies(result);
        return Ok();
    }
}