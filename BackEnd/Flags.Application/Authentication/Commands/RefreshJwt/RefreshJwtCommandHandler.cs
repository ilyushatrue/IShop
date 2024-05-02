using ErrorOr;
using Flags.Application.Common.Interfaces.Authentication;
using Flags.Application.Common.Interfaces.Persistance;
using MediatR;
using Flags.Application.Authentication.Common;
using Flags.Domain.Common.Errors;

namespace Flags.Application.Authentication.Commands.RefreshJwt;

public class RefreshJwtCommandHandler(
	IUserRepository userRepository,
	IJwtTokenGenerator jwtTokenGenerator,
	IUserRefreshJwtRepository userRefreshJwtRepository

) :
	IRequestHandler<RefreshJwtCommand, ErrorOr<AuthenticationResult>>
{
	public async Task<ErrorOr<AuthenticationResult>> Handle(RefreshJwtCommand command, CancellationToken cancellationToken)
	{
		var user = await userRefreshJwtRepository.GetByToken(command.JwtRefreshToken);
		if (user is not null)
		{
			var jwtAccessToken = jwtTokenGenerator.GenerateAccessToken(user);
			var jwtRefreshToken = jwtTokenGenerator.GenerateRefreshToken();
			var jwtRefreshTokenExpiryDatetime = DateTime.Now.AddMinutes(10).ToString();

			return new AuthenticationResult(user, jwtAccessToken, jwtRefreshToken, jwtRefreshTokenExpiryDatetime);

		}
		return Errors.Authentication.UserNotFound;
	}
}
