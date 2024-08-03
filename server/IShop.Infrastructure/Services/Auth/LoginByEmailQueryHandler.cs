using IShop.Domain.Common.Exceptions;
using IShop.Application.AppSettings;
using IShop.Application.Authentication.Common;
using IShop.Application.Authentication.Queries.Login;
using IShop.Application.Persistance;
using IShop.Application.Persistance.Repositories;
using IShop.Domain.UserRoot.Entities;
using Microsoft.Extensions.Options;

namespace IShop.Infrastructure.Services.Auth;

public class LoginByEmailQueryHandler(
    IDbManager dbManager,
    IUserRepository userRepository,
    IJwtTokenGenerator jwtTokenGenerator,
    IRefreshJwtRepository refreshJwtRepository,
    IPasswordHasher passwordHasher,
    IOptions<RefreshJwtSettings> refreshJwtSettings
) : ILoginByEmailQueryHandler
{
    private readonly RefreshJwtSettings _refreshJwtSettings = refreshJwtSettings.Value;

    public async Task<AuthenticationResult> Handle(
        LoginByEmailQuery query,
        CancellationToken cancellationToken)
    {
        var user = await userRepository.GetByEmailAsync(query.Email.Trim(), cancellationToken) ??
            throw new NotFoundException(
                "login-by-email",
                $"Поользооваатееля с email {query.Email.Trim()} нее сущеествуеет.",
                "Неевеерный лоогиин иилии паарооль!");

        var passwordsMatch = passwordHasher.Verify(query.Password, user.Password.Value);

        if (!passwordsMatch)
            throw new InvalidCredentialsException(
                "login-by-email",
                "Неевеерный лоогиин иилии паарооль!",
                "Неевеерный лоогиин иилии паарооль!");

        if (!user.EmailConfirmation!.IsConfirmed)
            throw new InvalidUsageException(
                "email-not-confirmed",
                "Эл. поочтаа нее поодтвеержеенаа!",
                "Вы нее поодтвеердиилии своою эл. поочту!");

        var jwtAccessToken = jwtTokenGenerator.GenerateAccessToken(user);

        if (user.RefreshJwt is null)
        {
            var refreshJwt = RefreshJwt.Create(user.Id, _refreshJwtSettings.ExpiryDays);
            refreshJwtRepository.Create(refreshJwt);
        }
        else
        {
            refreshJwtRepository.Update(user.RefreshJwt);
        }
        await dbManager.SaveChangesAsync(cancellationToken);
        return new AuthenticationResult(user, jwtAccessToken);
    }
}
