﻿using IShop.Contracts.Users;
using IShop.Domain.UserRoot;
using Mapster;

namespace IShop.Api.Common.Mapping;

public class UserMappingConfig : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<User, UserInitialDto>()
            .Map(dto => dto.Email, src => src.Email.Value)
            .Map(dto => dto.Phone, src => src.Phone.Value)
            .Map(dto => dto.FavoriteProducts, src => src.FavoriteProducts.Select(fp => fp.Product));
    }
}
