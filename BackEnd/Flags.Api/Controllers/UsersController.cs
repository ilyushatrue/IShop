using Flags.Application;
using Flags.Application.Products.Queries;
using Flags.Application.Users.Command;
using Flags.Application.Users.Queries;
using Flags.Contracts.Authentication;
using Flags.Contracts.Products;
using Flags.Domain.Common.Exceptions;
using Flags.Infrastructure.Authentication;
using Flags.Infrastructure.Services.Cookies;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Flags.Api.Controllers;

[Route("users")]
[Authorize(Policy = CustomPolicies.ADMIN_POLICY)]
public class UsersController(
    IMapper mapper,
    IGetAllUsersQueryHandler getAllUsersQueryHandler,
    IGetUserByIdQueryHandler getUserByIdQueryHandler,
    IEditUserDataCommandHandler editUserDataCommandHandler,
    IGetAllProductCategoriesQueryHandler getAllProductCategoriesQueryHandler,
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
    public async Task<IActionResult> GetCurrent()
    {
        AuthenticationResponse? authenticationResponse = null;
        var (firstName, lastName, phone, email, avatarId) = cookieManager.GetUserCookies();

        var requiredCredentials = new string?[]
        {
            firstName,
            lastName,
            email,
        };

        if (requiredCredentials.All(x => x is not null))
        {
            Guid? avatarGuid = Guid.TryParse(avatarId, out Guid result) ? result : null;
            authenticationResponse = new AuthenticationResponse(
                firstName!,
                lastName!,
                email!,
                phone,
                avatarGuid);
        }
        var categories = await getAllProductCategoriesQueryHandler.Handle();
        var initialResponse = new InitialResponse()
        {
            ProductCategories = mapper.Map<IEnumerable<ProductCategoryDto>>(categories),
            User = authenticationResponse
        };
        return Ok(initialResponse);
    }

    [HttpPut]
    public async Task<IActionResult> EditUserData([FromBody] EditUserDataCommand user, CancellationToken cancellationToken)
    {
        var result = await editUserDataCommandHandler.Handle(user, cancellationToken);
        cookieManager.SetUserCookies(result);
        return Ok();
    }
}