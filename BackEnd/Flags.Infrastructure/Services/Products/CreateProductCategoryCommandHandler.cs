using Flags.Application.Persistance;
using Flags.Application.Persistance.Repositories;
using Flags.Application.Products.Commands;
using Flags.Domain.ProductRoot.Entities;

namespace Flags.Infrastructure.Services.Products;
public class CreateProductCategoryCommandHandler(IProductCategoryRepository productCategoryRepository, IDbManager dbManager) : ICreateProductCategoryCommandHandler
{
    public async Task<bool> Handle(CreateProductCategoryCommand command)
    {
        var productCategory = new ProductCategory(command.Name, command.Order, command.IconName);
        productCategoryRepository.CreateAsync(productCategory);
        var result = await dbManager.SaveChangesAsync();
        return result > 0;
    }
}
