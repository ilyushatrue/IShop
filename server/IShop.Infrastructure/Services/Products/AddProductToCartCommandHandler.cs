using IShop.Application.Persistance;
using IShop.Application.Persistance.Repositories;
using IShop.Application.Products.Commands;

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

        user.AddFavoriteProduct(product);

        var affectedCount = await dbManager.SaveChangesAsync(cancellationToken);

        return affectedCount > 0;
    }
}
