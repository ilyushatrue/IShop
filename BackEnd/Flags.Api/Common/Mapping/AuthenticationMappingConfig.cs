using Flags.Application.Authentication.Common;
using Flags.Contracts.Authentication;
using Mapster;

namespace Flags.Api.Common.Mapping;

public class AuthenticationMappingConfig() : IRegister
{
	public void Register(TypeAdapterConfig config)
	{
		config.NewConfig<AuthenticationResult, AuthenticationResponse>()
			.Map(dest => dest, src => src.User);
	}
}
