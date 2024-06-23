using Flags.Domain.Common.Models;

namespace Flags.Domain.ProductRoot.Entities;
public class ProductCategory(string name) : Entity<int>
{
    public string Name { get; private set; } = name;
}
