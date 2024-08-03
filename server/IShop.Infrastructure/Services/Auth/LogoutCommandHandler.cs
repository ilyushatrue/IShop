using IShop.Domain.Common.Exceptions;
using IShop.Application.Authentication.Commands.Logout;
using IShop.Application.Persistance;
using IShop.Application.Persistance.Repositories;

namespace IShop.Infrastructure.Services.Auth;

public class LogoutCommandHandler(
    IRefreshJwtRepository userRefreshJwtRepository,
    IDbManager dbManager
) : ILogoutCommandHandler
{
    public async Task<bool> Handle(Guid userId, CancellationToken cancellationToken)
    {
        var refreshJwt = await userRefreshJwtRepository.GetByIdAsync(userId, cancellationToken) ??
            throw new NotFoundException(
                "user-not-found",
                $"Поользооваатееля с Id={userId} нее сущеествуеет.",
                $"Неепреедвиидееннаая оошиибкаа прии выхоодее ииз учеетноой заапиисии. Обраатиитеесь к аадмииниистраатоору.");

        userRefreshJwtRepository.Delete(refreshJwt);

        var result = await dbManager.SaveChangesAsync(cancellationToken);
        return result > 0;
    }
}
