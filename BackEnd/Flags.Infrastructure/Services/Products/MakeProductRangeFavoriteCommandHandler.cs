using Flags.Application.Persistance;
using Flags.Application.Persistance.Repositories;
using Flags.Application.Products.Commands.MakeProductFavorite;
using Flags.Domain.UserRoot.Entities;

namespace Flags.Infrastructure.Services.Products;
public class MakeProductRangeFavoriteCommandHandler(
    IDbManager dbManager,
    IUserFavoriteProductRepository userFavoriteProductRepository
    ) : IMakeProductRangeFavoriteCommandHandler
{
    public async Task<bool> Handle(MakeProductRangeFavoriteCommand command, CancellationToken cancellationToken)
    {
        var userFavorites = await userFavoriteProductRepository.GetUserFavorites(command.UserId, cancellationToken);
        var newFavorites = command.Commands
            .Where(c => userFavorites.All(uf => uf.ProductId != c.ProductId))
            .Select(c => new UserFavoriteProduct(command.UserId, c.ProductId));
        userFavoriteProductRepository.CreateRange(newFavorites);
        var result = await dbManager.SaveChangesAsync(cancellationToken);
        return result > 0;
    }
}
