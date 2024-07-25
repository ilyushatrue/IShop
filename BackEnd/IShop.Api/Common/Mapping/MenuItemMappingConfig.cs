using IShop.Contracts.MenuItems;
using IShop.Domain.MenuItemEntity;
using Mapster;

namespace IShop.Api.Common.Mapping;

public class MenuItemMappingConfig : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<MenuItemDto, MenuItem>();
    }
}
