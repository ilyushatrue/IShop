using Flags.Application.Products.Commands;
using Flags.Application.Products.Queries;
using Flags.Contracts.Products;
using Flags.Domain.ProductRoot;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Flags.Api.Controllers;

[Route("products")]
public class ProductController(
    IGetAllProductsQueryHandler getAllProductsQueryHandler,
    ICreateProductCommandHandler createProductCommandHandler,
    IDeleteProductByIdCommandHandler deleteProductByIdCommandHandler,
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
    public async Task<IActionResult> UpdateProductAsync(Product product, CancellationToken cancellationToken)
    {
        var result = await updateProductCommandHandler.Handle(product, cancellationToken);
        return Ok();
    }
}
