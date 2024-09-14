using IShop.Application.Common;
using IShop.Application.Products.Commands;
using IShop.Application.Products.Commands.MakeProductFavorite;
using IShop.Application.Products.Queries;
using IShop.Contracts.Products;
using IShop.Domain.ProductRoot.Entities;
using IShop.Infrastructure.Authentication;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading;

namespace IShop.Api.Controllers;

[Route("products")]
public class ProductController(
    IGetAllProductsQueryHandler getAllProductsQueryHandler,
    IGetProductByIdQueryHandler getProductByIdQueryHandler,
    IGetProductsByCategoryQueryHandler getProductsByCategoryQueryHandler,
    ICreateProductCommandHandler createProductCommandHandler,
    ICreateProductCategoryCommandHandler createProductCategoryCommandHandler,
    ISyncProductCategoriesCommandHandler updateProductCategoryCommandHandler,
    IDeleteProductsByIdCommandHandler deleteProductByIdCommandHandler,
    IGetAllProductCategoriesQueryHandler getAllProductCategoriesQueryHandler,
    IUpdateProductCommandHandler updateProductCommandHandler,
    IMakeProductFavoriteCommandHandler makeProductFavoriteCommandHandler,
    IMakeProductRangeFavoriteCommandHandler makeProductRangeFavoriteCommandHandler,
    IAddProductToCartCommandHandler addProductToCartCommandHandler,
    IMapper mapper) : ApiController
{
    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> GetAllProductsAsync(
        [FromQuery] int page,
        [FromQuery] int pageSize,
        [FromQuery] string? search,
        CancellationToken cancellationToken)
    {
        var command = new GetAllProductsQuery(page, pageSize, search);
        var result = await getAllProductsQueryHandler.Handle(command, cancellationToken);
        var pagedList = new Pager<ProductDto>()
        {
            PageItems = mapper.Map<IEnumerable<ProductDto>>(result.PageItems),
            TotalPages = result.TotalPages,
            CurrentPage = result.CurrentPage,
            PageSize = result.PageSize
        };
        return Ok(pagedList);
    }

    [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<ActionResult<ProductDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var result = await getProductByIdQueryHandler.Handle(new(id), cancellationToken);
        return mapper.Map<ProductDto>(result);
    }

    [AllowAnonymous]
    [HttpGet("filtered")]
    public async Task<IActionResult> GetProductsByCategory(
        [FromQuery] int categoryId,
        [FromQuery] string? search,
        [FromQuery] int page,
        [FromQuery] int pageSize,
        CancellationToken cancellationToken)
    {
        var command = new GetProductsByCategoryQuery(categoryId, search, page, pageSize);
        var result = await getProductsByCategoryQueryHandler.Handle(command, cancellationToken);
        var pagedList = new Pager<ProductDto>()
        {
            PageItems = mapper.Map<IEnumerable<ProductDto>>(result.PageItems),
            TotalPages = result.TotalPages,
            CurrentPage = result.CurrentPage,
            PageSize = result.PageSize
        };
        return Ok(pagedList);
    }

    [HttpPost("to-favorites")]
    public async Task<IActionResult> MakeProductFavorite([FromQuery] Guid productId, [FromQuery] bool value, CancellationToken cancellationToken)
    {
        var userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "UserId")!.Value;
        var command = new MakeProductFavoriteCommand(Guid.Parse(userId), productId, value);
        var result = await makeProductFavoriteCommandHandler.Handle(command, cancellationToken);
        return Ok(result);
    }

    [HttpPost("to-favorites-range")]
    public async Task<IActionResult> MakeProductRangeFavorite([FromBody] MakeProductRangeItemFavoriteCommand[] commands, CancellationToken cancellationToken)
    {
        var userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "UserId")!.Value;
        var command = new MakeProductRangeFavoriteCommand(Guid.Parse(userId), commands);
        var result = await makeProductRangeFavoriteCommandHandler.Handle(command, cancellationToken);
        return Ok(result);
    }

    [Authorize(Policy = CustomPolicies.EDIT_POLICY)]
    [HttpPost]
    public async Task<IActionResult> CreateProductAsync(CreateProductCommand command, CancellationToken cancellationToken)
    {
        await createProductCommandHandler.Handle(command, cancellationToken);
        return Ok();
    }

    [Authorize(Policy = CustomPolicies.EDIT_POLICY)]
    [HttpDelete]
    public async Task<IActionResult> DeleteProductRangeByIdAsync([FromBody] Guid[] ids, CancellationToken cancellationToken)
    {
        await deleteProductByIdCommandHandler.Handle(new(ids), cancellationToken);
        return Ok();
    }

    [Authorize(Policy = CustomPolicies.EDIT_POLICY)]
    [HttpPut]
    public async Task<IActionResult> UpdateProductAsync(UpdateProductCommand product, CancellationToken cancellationToken)
    {
        await updateProductCommandHandler.Handle(product, cancellationToken);
        return Ok();
    }

    [HttpGet("categories")]
    public async Task<IActionResult> GetAllProductCategoriesAsync(CancellationToken cancellationToken)
    {
        var result = await getAllProductCategoriesQueryHandler.Handle(cancellationToken);
        return Ok(result);
    }

    [Authorize(Policy = CustomPolicies.ADMIN_POLICY)]
    [HttpPost("categories")]
    public async Task<IActionResult> CreateProductCategoryAsync([FromBody] CreateProductCategoryCommand command, CancellationToken cancellationToken)
    {
        await createProductCategoryCommandHandler.Handle(command, cancellationToken);
        return Ok();
    }

    [Authorize(Policy = CustomPolicies.ADMIN_POLICY)]
    [HttpPut("categories")]
    public async Task<IActionResult> SyncProductCategoriesAsync([FromBody] ProductCategoryDto[] categoryDtos, CancellationToken cancellationToken)
    {
        var categories = mapper.Map<IEnumerable<ProductCategory>>(categoryDtos);
        var syncCommand = new SyncProductCategoriesCommand(categories);
        await updateProductCategoryCommandHandler.Handle(syncCommand, cancellationToken);
        return Ok();
    }

    [HttpPost("add-to-cart/{id}")]
    public async Task<IActionResult> AddProductToCartAsync(Guid id, CancellationToken cancellationToken)
    {
        await addProductToCartCommandHandler.Handle(new(id), cancellationToken);
        return Ok();
    }
}