﻿using Flags.Contracts.Authentication;
using Flags.Domain.UserRoot;
using Mapster;

namespace Flags.Api.Common.Mapping;

public class UserMappingConfig : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<User, UserInitialDto>()
            .Map(dto => dto.MenuItems, src => src.Role!.MemuItems);
    }
}
