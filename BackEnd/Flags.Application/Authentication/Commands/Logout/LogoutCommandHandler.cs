using ErrorOr;
using Flags.Application.Common.Interfaces.Persistance;
using MediatR;

namespace Flags.Application.Authentication.Commands.Logout;

public class LogoutCommandHandler(
	IRefreshJwtRepository userRefreshJwtRepository
) : IRequestHandler<LogoutCommand, ErrorOr<bool>>
{
	public async Task<ErrorOr<bool>> Handle(LogoutCommand command, CancellationToken cancellationToken)
	{
		var refreshJwt = await userRefreshJwtRepository.GetByIdAsync(command.UserId);


		return true;
	}
}
