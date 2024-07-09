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
            .Map(x => x.CategoryName, s => s.Category!.Name);

        config.NewConfig<ProductCategory, ProductCategoryDto>();
        config.NewConfig<ProductCategoryDto, ProductCategory>()
            .ConstructUsing(dto => new ProductCategory(dto.Name, dto.Order, dto.IconName));
    }
}
