using Flags.Application.Authentication.Common;
using Flags.Contracts.Authentication;
using Mapster;

namespace Flags.Api.Common.Mapping;

public class AuthenticationMappingConfig() : IRegister
{
	public void Register(TypeAdapterConfig config)
	{
		config.NewConfig<AuthenticationResult, AuthenticationResponse>()
			.Map(dest => dest.Email, src => src.User.Email.Value)
			.Map(dest => dest.Phone, src => src.User.Phone.Value)
			.Map(dest => dest.FirstName, src => src.User.FirstName)
			.Map(dest => dest.LastName, src => src.User.LastName)
			.Map(dest => dest.Id, src => src.User.Id);
	}
}
