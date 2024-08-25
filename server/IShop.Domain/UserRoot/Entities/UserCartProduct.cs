using IShop.Domain.ProductRoot;

namespace IShop.Domain.UserRoot.Entities;
public class UserCartProduct
{
    public UserCartProduct() { }
    public UserCartProduct(Guid userId, Guid productId)
    {
        UserId = userId;
        ProductId = productId;
    }
    public Guid UserId { get; private set; }
    public Guid ProductId { get; private set; }

    public User? User { get; private set; }
    public Product? Product { get; private set; }
}
