﻿using Flags.Domain.MenuItemEntity;

namespace Flags.Domain.UserRoot.Entities;
public class RoleMenuItem
{
    public RoleMenuItem() { }

    public RoleMenuItem(int roleId, int menuItemId)
    {
        MenuItemId = menuItemId;
        RoleId = roleId;
    }
    public int MenuItemId { get; private set; }
    public int RoleId { get; private set; }

    public MenuItem? MenuItem { get; private set; }
    public Role? Role { get; private set; }
}
