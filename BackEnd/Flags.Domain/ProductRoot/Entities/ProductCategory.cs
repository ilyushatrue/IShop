using Flags.Domain.Common.Models;

namespace Flags.Domain.ProductRoot.Entities;
public class ProductCategory : Entity<int>
{
    public ProductCategory(string name, int order, string? iconName = null)
    {
        Update(name, order, iconName);
    }
    public string Name { get; private set; } = null!;
    public string? IconName { get; private set; }
    public int Order { get; private set; }

    public void Update(string name, int order, string? iconName = null)
    {
        Name = name;
        IconName = iconName;
        Order = order;
    }
}
