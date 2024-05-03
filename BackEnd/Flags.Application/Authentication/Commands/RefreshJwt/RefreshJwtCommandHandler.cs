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
		var userRefreshJwt = await userRefreshJwtRepository.GetByTokenAsync(command.JwtRefreshToken);
		
		if (userRefreshJwt is not null)
		{
			var newJwtAccessToken = jwtTokenGenerator.GenerateAccessToken(userRefreshJwt.User);
			var newJwtRefreshToken = jwtTokenGenerator.GenerateRefreshToken();
			var newJwtRefreshTokenExpiryDatetime = DateTime.Now.AddMinutes(10).ToString();

			userRefreshJwt.Token = newJwtRefreshToken;
			await userRefreshJwtRepository.UpdateAsync(userRefreshJwt);

			return new AuthenticationResult(
                userRefreshJwt.User,
                newJwtAccessToken,
                newJwtRefreshToken,
                newJwtRefreshTokenExpiryDatetime);

		}
		else
		{
			return Errors.Authentication.UserNotFound;
		}
	}
}
