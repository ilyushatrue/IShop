using Flags.Domain.Common.Models;
using Flags.Domain.MediaEntity;

namespace Flags.Domain.ProductRoot;
public class Product : AggregateRoot<Guid>
{
    private Product() : base(new Guid()) { }
    private Product(Guid id) : base(id) { }

    private Product(Guid id, string name, decimal price, Guid imageId) : this(id)
    {
        Name = name;
        Price = price;
        ImageId = imageId;
    }
    public static Product Create(Guid id, string name, decimal price, Guid imageId)
    {
        return new Product(id, name, price, imageId);
    }


    public string Name { get; } = null!;
    public string? Description { get; } = null!;
    public decimal Price { get; }
    public Guid ImageId { get; }

    public Media? Image { get; }
}
