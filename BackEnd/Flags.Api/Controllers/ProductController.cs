using Flags.Application.Common;
using Flags.Application.Products.Commands;
using Flags.Application.Products.Queries;
using Flags.Contracts.Products;
using Flags.Domain.ProductRoot.Entities;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Flags.Api.Controllers;

[Route("products")]
public class ProductController(
    IGetAllProductsQueryHandler getAllProductsQueryHandler,
    IGetProductsByCategoryQueryHandler getProductsByCategoryQueryHandler,
    ICreateProductCommandHandler createProductCommandHandler,
    ICreateProductCategoryCommandHandler createProductCategoryCommandHandler,
    ISyncProductCategoriesCommandHandler updateProductCategoryCommandHandler,
    IDeleteProductByIdCommandHandler deleteProductByIdCommandHandler,
    IGetAllProductCategoriesQueryHandler getAllProductCategoriesQueryHandler,
    IUpdateProductCommandHandler updateProductCommandHandler,
    IMapper mapper) : ApiController
{
    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> GetAllProductsAsync(
        [FromQuery] int page,
        [FromQuery] int pageSize)
    {
        var result = await getAllProductsQueryHandler.Handle(new(page, pageSize));
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
    [HttpGet("by-category")]
    public async Task<IActionResult> GetProductsByCategory(
        [FromQuery] int categoryId,
        [FromQuery] int page,
        [FromQuery] int pageSize)
    {
        var result = await getProductsByCategoryQueryHandler.Handle(new(categoryId, page, pageSize));
        var pagedList = new Pager<ProductDto>()
        {
            PageItems = mapper.Map<IEnumerable<ProductDto>>(result.PageItems),
            TotalPages = result.TotalPages,
            CurrentPage = result.CurrentPage,
            PageSize = result.PageSize
        };
        return Ok(pagedList);
    }

    [HttpPost]
    public async Task<IActionResult> CreateProductAsync(CreateProductCommand command, CancellationToken cancellationToken)
    {
        await createProductCommandHandler.Handle(command, cancellationToken);
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProductAsync(Guid id, CancellationToken cancellationToken)
    {
        await deleteProductByIdCommandHandler.Handle(id, cancellationToken);
        return Ok();
    }

    [HttpPut]
    public async Task<IActionResult> UpdateProductAsync(UpdateProductCommand product, CancellationToken cancellationToken)
    {
        await updateProductCommandHandler.Handle(product, cancellationToken);
        return Ok();
    }

    [HttpGet("categories")]
    public async Task<IActionResult> GetAllProductCategoriesAsync()
    {
        var result = await getAllProductCategoriesQueryHandler.Handle();
        return Ok(result);
    }

    [HttpPost("categories")]
    public async Task<IActionResult> CreateProductCategoryAsync(CreateProductCategoryCommand command)
    {
        await createProductCategoryCommandHandler.Handle(command);
        return Ok();
    }

    [HttpPut("categories")]
    public async Task<IActionResult> SyncProductCategoriesAsync(IEnumerable<ProductCategoryDto> products)
    {
        var mapped = mapper.Map<IEnumerable<ProductCategory>>(products);
        await updateProductCategoryCommandHandler.Handle(mapped);
        return Ok();
    }
}