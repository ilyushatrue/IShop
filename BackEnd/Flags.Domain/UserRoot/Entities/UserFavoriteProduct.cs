using Flags.Domain.ProductRoot;

namespace Flags.Domain.UserRoot.Entities;
public class UserFavoriteProduct
{
    public UserFavoriteProduct() { }
    public UserFavoriteProduct(Guid userId, Guid productId)
    {
        UserId = userId;
        ProductId = productId;
    }
    public Guid UserId { get; private set; }
    public Guid ProductId { get; private set; }

    public User? User { get; private set; }
    public Product? Product { get; private set; }
}
