using IShop.Domain.Enums;
using IShop.Domain.MenuItemEntity;

namespace IShop.Domain.UserRoot.Entities;
public class RoleMenuItem
{
    public RoleMenuItem() { }

    public RoleMenuItem(RoleEnum role, MenuItemEnum menuItem)
    {
        RoleId = (int)role;
        MenuItemId = (int)menuItem;
    }
    public int RoleId { get; private set; }
    public int MenuItemId { get; private set; }

    public Role? Role { get; private set; }
    public MenuItem? MenuItem { get; private set; }
}
