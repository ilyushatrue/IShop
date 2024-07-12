using Flags.Contracts.MenuItems;
using Flags.Domain.MenuItemEntity;
using Mapster;

namespace Flags.Api.Common.Mapping;

public class MenuItemMappingConfig : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<MenuItemDto, MenuItem>();
    }
}
