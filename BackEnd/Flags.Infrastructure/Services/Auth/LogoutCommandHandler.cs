using ErrorOr;
using Flags.Application.Authentication.Commands.Logout;
using Flags.Application.Common.Persistance;
using Flags.Domain.Common.Errors;

namespace Flags.Infrastructure.Services.Auth;

public class LogoutCommandHandler(
    IRefreshJwtRepository userRefreshJwtRepository
) : ILogoutCommandHandler
{
    public async Task<ErrorOr<bool>> Handle(Guid id, CancellationToken cancellationToken)
    {
        var refreshJwt = await userRefreshJwtRepository.GetByIdAsync(id);
        if (refreshJwt is null)
            return Errors.Authentication.UserNotFound;

        var result = await userRefreshJwtRepository.DeleteAsync(refreshJwt);
        return result > 0;
    }
}
