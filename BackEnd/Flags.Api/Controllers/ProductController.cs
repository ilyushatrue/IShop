using Flags.Application.Products.Commands;
using Flags.Application.Products.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Flags.Api.Controllers;

[Route("products")]
public class ProductController(
    IGetAllProductsQueryHandler getAllProductsQueryHandler,
    ICreateProductCommandHandler createProductCommandHandler,
    IDeleteProductByIdCommandHandler deleteProductByIdCommandHandler,
    IUpdateProductCommandHandler updateProductCommandHandler) : ApiController
{
    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> GetAllProductsAsync(CancellationToken cancellationToken)
    {
        var result = await getAllProductsQueryHandler.Handle(cancellationToken);

        return result.Match(
            ok => Ok(result),
            errors => Problem(errors));
    }

    [HttpPost]
    public async Task<IActionResult> CreateProductAsync(CreateProductCommand command, CancellationToken cancellationToken)
    {
        var result = await createProductCommandHandler.Handle(command, cancellationToken);

        return result.Match(
            ok => Ok(result),
            errors => Problem(errors));
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteProductAsync(Guid id, CancellationToken cancellationToken)
    {
        var result = await deleteProductByIdCommandHandler.Handle(id, cancellationToken);

        return result.Match(
            ok => Ok(result),
            errors => Problem(errors));
    }

    [HttpPut]
    public async Task<IActionResult> UpdateProductAsync(CreateProductCommand command, CancellationToken cancellationToken)
    {
        var result = await createProductCommandHandler.Handle(command, cancellationToken);

        return result.Match(
            ok => Ok(result),
            errors => Problem(errors));
    }
}
