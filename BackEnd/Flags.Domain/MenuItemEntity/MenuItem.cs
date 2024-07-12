using Flags.Domain.Common.Models;
using Flags.Domain.UserRoot.Entities;

namespace Flags.Domain.MenuItemEntity;
public class MenuItem : AggregateRoot<Guid>
{
    private readonly List<RoleMenuItem> _roleMenuItems = [];
    private readonly List<Role> _roles = [];

    private MenuItem() : base(Guid.NewGuid()) { }
    private MenuItem(Guid id) : base(id) { }
    private MenuItem(string name, string title, string url, int order) : this(Guid.NewGuid())
    {
        Update(name, title, url, order);
    }
    public string Name { get; private set; } = null!;
    public string Title { get; private set; } = null!;
    public string Url { get; private set; } = null!;
    public int Order { get; private set; }

    public IReadOnlyCollection<RoleMenuItem>? RoleMenuItems => _roleMenuItems.AsReadOnly();
    public IReadOnlyCollection<Role>? Roles => _roles.AsReadOnly();


    public static MenuItem Create(string name, string title, string url, int order)
    {
        return new MenuItem(name, title, url, order);
    }

    public void Update(string name, string title, string url, int order)
    {
        if (order <= 0) order = 1;

        Name = name;
        Title = title;
        Order = order;
        Url = url;
    }
}
