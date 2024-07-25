namespace IShop.Application.Products.Commands.MakeProductFavorite;
public record MakeProductRangeFavoriteCommand(
    Guid UserId,
    MakeProductRangeItemFavoriteCommand[] Commands);

public record MakeProductRangeItemFavoriteCommand(
    Guid ProductId,
    bool Value);
