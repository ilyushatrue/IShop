using ErrorOr;
using Flags.Application.Common.Interfaces.Persistance;
using Flags.Domain.Common.Errors;
using MediatR;

namespace Flags.Application.Authentication.Commands.Logout;

public class LogoutCommandHandler(
	IRefreshJwtRepository userRefreshJwtRepository
) : IRequestHandler<LogoutCommand, ErrorOr<bool>>
{
	public async Task<ErrorOr<bool>> Handle(LogoutCommand command, CancellationToken cancellationToken)
	{
		var refreshJwt = await userRefreshJwtRepository.GetByIdAsync(command.UserId);
		if (refreshJwt is not null)
		{
			var result = await userRefreshJwtRepository.DeleteAsync(refreshJwt);
			return result > 0;
		}
		else
		{
			return Errors.Authentication.UserNotFound;
		}
	}
}
