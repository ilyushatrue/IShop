using Flags.Application.Authentication.Commands.Logout;
using Flags.Application.Common.Persistance;
using Flags.Domain.Common.Exceptions;

namespace Flags.Infrastructure.Services.Auth;

public class LogoutCommandHandler(
    IRefreshJwtRepository userRefreshJwtRepository
) : ILogoutCommandHandler
{
    public async Task<bool> Handle(Guid userId, CancellationToken cancellationToken)
    {
        var refreshJwt = await userRefreshJwtRepository.GetByIdAsync(userId) ??
            throw new NotFoundException("Пользователя не существует.");

        var result = await userRefreshJwtRepository.DeleteAsync(refreshJwt);
        return result > 0;
    }
}
