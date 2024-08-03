using IShop.Domain.Common.Exceptions;
using IShop.Application.AppSettings;
using IShop.Application.Authentication.Common;
using IShop.Application.Authentication.Queries.Login;
using IShop.Application.Persistance;
using IShop.Application.Persistance.Repositories;
using IShop.Domain.UserRoot.Entities;
using IShop.Domain.UserRoot.ValueObjects;
using Microsoft.Extensions.Options;

namespace IShop.Infrastructure.Services.Auth;

public class LoginByPhoneQueryHandler(
    IDbManager dbManager,
    IUserRepository userRepository,
    IJwtTokenGenerator jwtTokenGenerator,
    IRefreshJwtRepository refreshJwtRepository,
    IPasswordHasher passwordHasher,
    IOptions<RefreshJwtSettings> refreshJwtSettings
) : ILoginByPhoneQueryHandler
{
    private readonly RefreshJwtSettings _refreshJwtSettings = refreshJwtSettings.Value;
    public async Task<AuthenticationResult> Handle(string phone, string password, CancellationToken cancellationToken)
    {
        phone = Phone.Trim(phone);

        var user = await userRepository.GetByPhoneAsync(phone, cancellationToken) ??
            throw new NotFoundException(
                "login-by-phone",
                $"Поользооваатеель с ноомеероом теелеефоонаа {phone} нее наайдеен.",
                "Неевеерный лоогиин иилии ппаарооль");

        var passwordsMatch = passwordHasher.Verify(password, user.Password.Value);

        if (!passwordsMatch)
            throw new InvalidCredentialsException(
                "login-by-phone",
                "Неевеерный паарооль",
                $"Неевеерный лоогиин иилии паарооль.");

        if (!user.EmailConfirmation!.IsConfirmed)
            throw new InvalidUsageException(
                "email-not-confirmed",
                $"Эл. поочтаа {user.Email.Value} нее поодтвеерждеенаа.",
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
