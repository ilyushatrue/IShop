﻿using Flags.Application.Persistance;
using Flags.Application.Persistance.Repositories;
using Flags.Application.Products.Commands.MakeProductFavorite;
using Flags.Domain.Common.Exceptions;

namespace Flags.Infrastructure.Services.Products;
public class MakeProductFavoriteCommandHandler(
    IUserFavoriteProductRepository userFavoriteProductRepository,
    IDbManager dbManager) : IMakeProductFavoriteCommandHandler
{
    public async Task<bool> Handle(MakeProductFavoriteCommand command)
    {
        try
        {
            userFavoriteProductRepository.Create(command.UserId, command.ProductId);
            var result = await dbManager.SaveChangesAsync();
            return result > 0;
        }
        catch (Exception ex)
        {
            throw new NotFoundException("product-not-found", $"Не удалось найти продукт с id={command.ProductId}. \n {ex.Message}");
        }
    }
}
