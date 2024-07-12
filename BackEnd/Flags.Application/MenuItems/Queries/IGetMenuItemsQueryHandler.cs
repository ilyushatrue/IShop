using Flags.Domain.MenuItemEntity;

namespace Flags.Application.MenuItems.Queries;
public interface IGetMenuItemsQueryHandler
{
    Task<IEnumerable<MenuItem>> Handle();
}
