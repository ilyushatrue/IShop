using Flags.Application;
using Flags.Application.Products.Queries;
using Flags.Contracts.Products;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Flags.Api.Controllers;

[Route("init")]
public class InitController(
    IMapper mapper,
    IGetAllProductCategoriesQueryHandler getAllProductCategoriesQueryHandler) : ApiController
{
    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> GetInitialData()
    {
        var categories = await getAllProductCategoriesQueryHandler.Handle();
        var initialResponse = new InitialResponse()
        {
            ProductCategories = mapper.Map<IEnumerable<ProductCategoryDto>>(categories),
        };
        return Ok(initialResponse);
    }
}
