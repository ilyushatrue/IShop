using Flags.Domain.Common.Models;

namespace Flags.Domain.ProductRoot.Entities;
public class ProductCategory : Entity<int>
{
    public ProductCategory(string name, string title, int order, int? parentId = null, string? iconName = null)
    {
        Update(name, title, order, parentId, iconName);
    }
    public string Name { get; private set; } = null!;
    public string Title { get; private set; } = null!;
    public string? IconName { get; private set; }
    public int Order { get; private set; }
    public int? ParentId { get; private set; }

    public ProductCategory? Parent { get; private set; }
    public ICollection<ProductCategory>? Children { get; private set; }

    public void Update(string name, string title, int order, int? parentId = null, string? iconName = null)
    {
        Name = name;
        Title = title;
        IconName = iconName;
        ParentId = parentId;
        Order = order;
    }
}
