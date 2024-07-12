using Flags.Application.Authentication.Commands.Logout;
using Flags.Application.Persistance;
using Flags.Application.Persistance.Repositories;
using Flags.Domain.Common.Exceptions;

namespace Flags.Infrastructure.Services.Auth;

public class LogoutCommandHandler(
    IRefreshJwtRepository userRefreshJwtRepository,
    IDbManager dbManager
) : ILogoutCommandHandler
{
    public async Task<bool> Handle(Guid userId, CancellationToken cancellationToken)
    {
        var refreshJwt = await userRefreshJwtRepository.GetByIdAsync(userId) ??
            throw new NotFoundException(
                "user-not-found",
                $"Пользователя с Id={userId} не существует.",
                $"Непредвиденная ошибка при выходе из учетной записи. Обратитесь к администратору.");

        userRefreshJwtRepository.DeleteAsync(refreshJwt);

        var result = await dbManager.SaveChangesAsync();
        return result > 0;
    }
}
