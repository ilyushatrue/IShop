namespace Flags.Application.Persistance.Repositories;
public interface IUserFavoriteProductRepository
{
    void Create(Guid userId, Guid productId);
    void Delete(Guid userId, Guid productId);
}
