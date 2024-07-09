using Flags.Application.Products.Commands;
using Flags.Application.Products.Queries;
using Flags.Contracts.Products;
using Flags.Domain.ProductRoot;
using Flags.Domain.ProductRoot.Entities;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Flags.Api.Controllers;

[Route("products")]
public class ProductController(
    IGetAllProductsQueryHandler getAllProductsQueryHandler,
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
    public async Task<IActionResult> GetAllProductsAsync(CancellationToken cancellationToken)
    {
        var result = await getAllProductsQueryHandler.Handle(cancellationToken);
        return Ok(mapper.Map<IEnumerable<ProductDto>>(result));
    }

    [HttpGet("categories")]
    public async Task<IActionResult> GetAllProductCategoriesAsync()
    {
        var result = await getAllProductCategoriesQueryHandler.Handle();
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> CreateProductAsync(CreateProductCommand command, CancellationToken cancellationToken)
    {
        await createProductCommandHandler.Handle(command, cancellationToken);
        return Ok();
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

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProductAsync(Guid id, CancellationToken cancellationToken)
    {
        await deleteProductByIdCommandHandler.Handle(id, cancellationToken);
        return Ok();
    }

    [HttpPut]
    public async Task<IActionResult> UpdateProductAsync(Product product, CancellationToken cancellationToken)
    {
        await updateProductCommandHandler.Handle(product, cancellationToken);
        return Ok();
    }
}
