using Flags.Domain.Common.Models;
using Flags.Domain.MediaEntity;
using Flags.Domain.ProductRoot.Entities;

namespace Flags.Domain.ProductRoot;
public class Product : AggregateRoot<Guid>
{
    private Product() : base(new Guid()) { }
    private Product(Guid id) : base(id) { }

    private Product(Guid id, string name, decimal price, Guid imageId, string? description) : this(id)
    {
        Name = name;
        Price = price;
        ImageId = imageId;
        Description = description;
    }
    public static Product Create(Guid id, string name, decimal price, Guid imageId, string? description)
    {
        return new Product(id, name, price, imageId, description);
    }

    public string Name { get; private set; } = null!;
    public string? Description { get; private set; }
    public decimal Price { get; private set; }
    public Guid ImageId { get; private set; }
    public int CategoryId { get; private set; }

    public Media? Image { get; private set; }
    public ProductCategory? Category { get; private set; }
}
