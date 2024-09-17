using IShop.Application.Persistance;
using IShop.Application.Persistance.Repositories;
using IShop.Application.Products.Commands;
using IShop.Domain.Common.Exceptions;

namespace IShop.Infrastructure.Services.Products;
public class AddProductToCartCommandHandler(
    IDbManager dbManager,
    IProductRepository productRepository,
    IUserRepository userRepository) : IAddProductToCartCommandHandler
{
    public async Task<bool> Handle(AddProductToCartCommand command, CancellationToken cancellationToken)
    {
        var product = await productRepository.GetByIdAsync(command.ProductId, cancellationToken) ??
            throw new Exception($"Товар с id=${command.ProductId} не был найден в базе данных.");

        var user = await userRepository.GetByIdAsync(command.UserId, cancellationToken) ??
            throw new Exception($"Пользователь с id=${command.UserId} не был найден в базе данных.");

        if (user.FavoriteProducts!.Any(x => x.ProductId == command.ProductId))
        {
            throw new ConflictException(
                "product-is-already-in-cart", 
                $"Товар с Id={product.Id} пользователя с Id=${user.Id} уже в корзине", 
                $"Товар уже добавлен в корзину.");
        }
        user.AddFavoriteProduct(product);

        var affectedCount = await dbManager.SaveChangesAsync(cancellationToken);

        return affectedCount > 0;
    }
}
