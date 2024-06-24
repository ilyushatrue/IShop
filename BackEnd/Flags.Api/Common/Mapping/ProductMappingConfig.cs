using Flags.Contracts.Products;
using Flags.Domain.ProductRoot;
using Mapster;

namespace Flags.Api.Common.Mapping;

public class ProductMappingConfig : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<Product, ProductDto>()
            .Map(x => x.Category, s => s.Category!.Name);
    }
}
