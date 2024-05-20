using ErrorOr;
using Flags.Application.Common.Interfaces.Authentication;
using Flags.Application.Common.Interfaces.Persistance;
using MediatR;
using Flags.Application.Authentication.Common;
using Flags.Domain.Common.Errors;

namespace Flags.Application.Authentication.Commands.RefreshJwt;

public class RefreshJwtCommandHandler(
	IJwtTokenGenerator jwtTokenGenerator,
	IRefreshJwtRepository refreshJwtRepository,
    IUserRepository userRepository
) :
	IRequestHandler<RefreshJwtCommand, ErrorOr<AuthenticationResult>>
{
	public async Task<ErrorOr<AuthenticationResult>> Handle(RefreshJwtCommand command, CancellationToken cancellationToken)
	{
		var user = await userRepository.GetByPhoneAsync(command.UserPhone);

		if (user?.RefreshJwt is not null)
		{
			var newJwtAccessToken = jwtTokenGenerator.GenerateAccessToken(user);
			if (user.RefreshJwt.ExpiryDatetime <= DateTime.Now.AddMinutes(-1))
			{
				await refreshJwtRepository.UpdateAsync(user.RefreshJwt);
			}
			return new AuthenticationResult(
				user,
				newJwtAccessToken);
		}
		else
		{
			return Errors.Authentication.UserNotFound;
		}
	}
}
