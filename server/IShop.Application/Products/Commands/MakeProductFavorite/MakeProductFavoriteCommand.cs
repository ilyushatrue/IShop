﻿namespace IShop.Application.Products.Commands.MakeProductFavorite;
public record MakeProductFavoriteCommand(
    Guid UserId,
    Guid ProductId,
    bool Value);
