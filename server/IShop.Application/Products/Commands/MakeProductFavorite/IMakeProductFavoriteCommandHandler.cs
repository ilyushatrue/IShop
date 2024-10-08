﻿namespace IShop.Application.Products.Commands.MakeProductFavorite;
public interface IMakeProductFavoriteCommandHandler
{
    Task<bool> Handle(MakeProductFavoriteCommand command, CancellationToken cancellationToken);
}
