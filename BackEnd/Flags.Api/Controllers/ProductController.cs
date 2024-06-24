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

        return result.Match(
            value => Ok(mapper.Map<IEnumerable<ProductDto>>(value)),
            errors => Problem(errors));
    }

    [HttpPost]
    public async Task<IActionResult> CreateProductAsync(CreateProductCommand command, CancellationToken cancellationToken)
    {
        var result = await createProductCommandHandler.Handle(command, cancellationToken);

        return result.Match(
            ok => Ok(),
            errors => Problem(errors));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProductAsync(Guid id, CancellationToken cancellationToken)
    {
        var result = await deleteProductByIdCommandHandler.Handle(id, cancellationToken);

        return result.Match(
            ok => Ok(),
            errors => Problem(errors));
    }

    [HttpPut]
    public async Task<IActionResult> UpdateProductAsync(Product product, CancellationToken cancellationToken)
    {
        var result = await updateProductCommandHandler.Handle(product, cancellationToken);

        return result.Match(
            ok => Ok(),
            errors => Problem(errors));
    }
}
