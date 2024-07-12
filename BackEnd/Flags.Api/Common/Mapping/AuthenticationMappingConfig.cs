using Flags.Application.Authentication.Common;
using Flags.Contracts.Authentication;
using Mapster;

namespace Flags.Api.Common.Mapping;

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
