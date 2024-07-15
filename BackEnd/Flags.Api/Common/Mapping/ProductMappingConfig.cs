using Flags.Contracts.Products;
using Flags.Domain.ProductRoot;
using Flags.Domain.ProductRoot.Entities;
using Mapster;

namespace Flags.Api.Common.Mapping;

public class ProductMappingConfig : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<Product, ProductDto>()
            .Map(x => x.CategoryId, s => s.Category!.Id);

        config.NewConfig<ProductCategory, ProductCategoryDto>();
        config.NewConfig<ProductCategoryDto, ProductCategory>()
            .ConstructUsing(dto => new ProductCategory(
                dto.Name,
                dto.Title,
                dto.Order,
                dto.ParentId,
                dto.IconName));
    }
}
