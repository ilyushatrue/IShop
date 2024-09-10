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
                $"Пользователя с email {query.Email.Trim()} не существует.",
                "Неверный логин или пароль!");

        var passwordsMatch = passwordHasher.Verify(query.Password, user.Password.Value);

        if (!passwordsMatch)
            throw new InvalidCredentialsException(
                "login-by-email",
                "Неверный логин или пароль!",
                "Неверный логин или пароль!");

        if (!user.EmailConfirmation!.IsConfirmed)
            throw new InvalidUsageException(
                "email-not-confirmed",
                "Эл. почта не подтвержена!",
                "Вы не подтвердили свою эл. почту!");

        var jwtAccessToken = jwtTokenGenerator.GenerateAccessToken(user);

        var refreshJwt = RefreshJwt.Create(user.Id, _refreshJwtSettings.ExpiryDays);
        user.SetRefreshToken(refreshJwt);

        await dbManager.SaveChangesAsync(cancellationToken);
        return new AuthenticationResult(user, jwtAccessToken);
    }
}
