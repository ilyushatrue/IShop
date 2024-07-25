using IShop.Application.Persistance;
using IShop.Application.Persistance.Repositories;
using IShop.Application.Products.Commands;

namespace IShop.Infrastructure.Services.Products;
public class UpdateProductCommandHandler(
    IProductRepository productRepository,
    IDbManager dbManager) : IUpdateProductCommandHandler
{
    public async Task<bool> Handle(UpdateProductCommand product, CancellationToken cancellationToken)
    {
        var dbProduct = await productRepository.GetByIdAsync(product.Id, cancellationToken);
        dbProduct.Update(product.Name, product.Price, product.ImageId, product.CategoryId, product.Description);
        productRepository.Update(dbProduct);
        var affectedRecords = await dbManager.SaveChangesAsync(cancellationToken);
        return affectedRecords > 0;
    }
}
