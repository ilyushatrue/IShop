namespace Flags.Application.Products.Commands.MakeProductFavorite;
public interface IMakeProductRangeFavoriteCommandHandler
{
    Task<bool> Handle(MakeProductRangeFavoriteCommand command, CancellationToken cancellationToken);
}
