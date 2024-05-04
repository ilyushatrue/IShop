using ErrorOr;
using Flags.Application.Common.Interfaces.Authentication;
using Flags.Application.Common.Interfaces.Persistance;
using MediatR;
using Flags.Application.Authentication.Common;
using Flags.Domain.Common.Errors;

namespace Flags.Application.Authentication.Commands.RefreshJwt;

public class RefreshJwtCommandHandler(
	IJwtTokenGenerator jwtTokenGenerator,
	IRefreshJwtRepository userRefreshJwtRepository
) :
	IRequestHandler<RefreshJwtCommand, ErrorOr<AuthenticationResult>>
{
	public async Task<ErrorOr<AuthenticationResult>> Handle(RefreshJwtCommand command, CancellationToken cancellationToken)
	{
		var refreshJwt = await userRefreshJwtRepository.GetByIdAsync(command.UserId);

		if (refreshJwt is not null)
		{
			var newJwtAccessToken = jwtTokenGenerator.GenerateAccessToken(refreshJwt.User);
			if (refreshJwt.ExpiryDatetime <= DateTime.Now.AddMinutes(-1))
			{
				await userRefreshJwtRepository.UpdateAsync(refreshJwt);
			}
			return new AuthenticationResult(
				refreshJwt.User,
				newJwtAccessToken);
		}
		else
		{
			return Errors.Authentication.UserNotFound;
		}
	}
}
