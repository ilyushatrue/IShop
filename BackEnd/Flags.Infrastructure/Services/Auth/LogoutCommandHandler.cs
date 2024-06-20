using ErrorOr;
using Flags.Application.Authentication.Commands;
using Flags.Application.Common.Interfaces.Persistance;
using Flags.Application.Common.Interfaces.Services.Auth;
using Flags.Domain.Common.Errors;

namespace Flags.Infrastructure.Services.Auth;

public class LogoutCommandHandler(
    IRefreshJwtRepository userRefreshJwtRepository
) : ILogoutCommandHandler
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
