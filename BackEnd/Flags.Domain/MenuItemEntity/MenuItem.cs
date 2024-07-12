using Flags.Domain.Common.Models;
using Flags.Domain.UserRoot.Entities;

namespace Flags.Domain.MenuItemEntity;
public class MenuItem : AggregateRoot<Guid>
{
    private readonly List<RoleMenuItem> _roleMenuItems = [];
    private readonly List<Role> _roles = [];

    private MenuItem() : base(Guid.NewGuid()) { }
    private MenuItem(Guid id) : base(id) { }
    private MenuItem(string name, string title, string url, string iconName, int order) : this(Guid.NewGuid())
    {
        Update(name, title, url, iconName, order);
    }
    public string Name { get; private set; } = null!;
    public string Title { get; private set; } = null!;
    public string Url { get; private set; } = null!;
    public int Order { get; private set; }
    public string IconName { get; private set; } = null!;

    public IReadOnlyCollection<RoleMenuItem>? RoleMenuItems => _roleMenuItems.AsReadOnly();
    public IReadOnlyCollection<Role>? Roles => _roles.AsReadOnly();


    public static MenuItem Create(string name, string title, string url, string iconName, int order)
    {
        return new MenuItem(name, title, url, iconName, order);
    }

    public void Update(string name, string title, string url, string iconName, int order)
    {
        if (order <= 0) order = 1;

        Name = name;
        Title = title;
        Order = order;
        IconName = iconName;
        Url = url;
    }
}
