using Flags.Domain.Common.Models;
using Flags.Domain.UserRoot.Entities;

namespace Flags.Domain.MenuItemEntity;
public class MenuItem : AggregateRoot<int>
{
    private readonly List<RoleMenuItem> _roleMenuItems = [];
    private readonly List<Role> _roles = [];

    private MenuItem() : base(0) { }
    private MenuItem(int id) : base(id) { }
    private MenuItem(int id, string name, string title, string url, string iconName, int order) : this()
    {
        Update(id, name, title, url, iconName, order);
    }
    public string Name { get; private set; } = null!;
    public string Title { get; private set; } = null!;
    public string Url { get; private set; } = null!;
    public int Order { get; private set; }
    public string IconName { get; private set; } = null!;

    public IReadOnlyCollection<RoleMenuItem>? RoleMenuItems => _roleMenuItems.AsReadOnly();
    public IReadOnlyCollection<Role>? Roles => _roles.AsReadOnly();


    public static MenuItem Create(int id, string name, string title, string url, string iconName, int order)
    {
        return new MenuItem(id, name, title, url, iconName, order);
    }

    public void Update(int id, string name, string title, string url, string iconName, int order)
    {
        if (order <= 0) order = 1;

        Id = id;
        Name = name;
        Title = title;
        Order = order;
        IconName = iconName;
        Url = url;
    }
}
