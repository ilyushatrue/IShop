using IShop.Domain.Common.Exceptions;
using IShop.Application.Persistance;
using IShop.Application.Persistance.Repositories;
using IShop.Application.Products.Commands.MakeProductFavorite;

namespace IShop.Infrastructure.Services.Products;
public class MakeProductFavoriteCommandHandler(
    IUserFavoriteProductRepository userFavoriteProductRepository,
    IDbManager dbManager) : IMakeProductFavoriteCommandHandler
{
    public async Task<bool> Handle(MakeProductFavoriteCommand command, CancellationToken cancellationToken)
    {
        try
        {
            if (command.Value)
            {
                userFavoriteProductRepository.Create(command.UserId, command.ProductId);
            }
            else
            {
                userFavoriteProductRepository.Delete(command.UserId, command.ProductId);
            }
            var result = await dbManager.SaveChangesAsync(cancellationToken);
            return result > 0;
        }
        catch (Exception ex)
        {
            throw new NotFoundException("product-not-found", $"Не удалось найти продукт с id={command.ProductId}. \n {ex.Message}");
        }
    }
}
