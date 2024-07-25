using IShop.Application.Authentication.Common;
using IShop.Contracts.Users;
using Mapster;

namespace IShop.Api.Common.Mapping;

public class AuthenticationMappingConfig() : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<AuthenticationResult, UserInitialDto>()
            .Map(dest => dest.Email, src => src.User.Email.Value)
            .Map(dest => dest.Phone, src => src.User.Phone.Value)
            .Map(dest => dest.FirstName, src => src.User.FirstName)
            .Map(dest => dest.LastName, src => src.User.LastName);
    }
}
