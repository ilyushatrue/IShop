using Flags.Application.Persistance;
using Flags.Application.Persistance.Repositories;
using Flags.Application.Products.Commands;
using Flags.Domain.ProductRoot.Entities;

namespace Flags.Infrastructure.Services.Products;
public class CreateProductCategoryCommandHandler(
    IProductCategoryRepository productCategoryRepository,
    IDbManager dbManager) : ICreateProductCategoryCommandHandler
{
    public async Task<bool> Handle(CreateProductCategoryCommand command, CancellationToken cancellationToken)
    {
        var productCategory = new ProductCategory(
            
            command.Name,
            command.Title,
            command.Order,
            command.ParentId,
            command.IconName);

        productCategoryRepository.CreateAsync(productCategory);
        var result = await dbManager.SaveChangesAsync(cancellationToken);
        return result > 0;
    }
}
