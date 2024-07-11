using Flags.Application.AppSettings;
using Flags.Application.Authentication.Commands.Login;
using Flags.Application.Authentication.Common;
using Flags.Application.Persistance.Repositories;
using Flags.Domain.Common.Exceptions;
using Flags.Domain.UserRoot.Entities;
using Flags.Domain.UserRoot.ValueObjects;
using Microsoft.Extensions.Options;

namespace Flags.Infrastructure.Services.Auth;

public class LoginByPhoneQueryHandler(
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

        var user = await userRepository.GetByPhoneAsync(phone) ??
            throw new NotFoundException($"Пользователь с номером телефона {phone} не найден.");

        var passwordsMatch = passwordHasher.Verify(password, user.Password.Value);

        if (!passwordsMatch)
            throw new InvalidCredentialsException($"Неверный логин или пароль.");

        if (!user.EmailConfirmation!.IsConfirmed)
            throw new InvalidUsageException("Вы не подтвердили свою эл. почту!", "email-not-confirmed");

        var jwtAccessToken = jwtTokenGenerator.GenerateAccessToken(user);

        if (user.RefreshJwt is null)
        {
            var refreshJwt = RefreshJwt.Create(user.Id, _refreshJwtSettings.ExpiryDays);
            await refreshJwtRepository.CreateAsync(refreshJwt);
        }
        else
        {
            await refreshJwtRepository.UpdateAsync(user.RefreshJwt);
        }

        return new AuthenticationResult(user, jwtAccessToken);
    }
}
