using Flags.Application.AppSettings;
using Flags.Application.Authentication.Commands.Login;
using Flags.Application.Authentication.Common;
using Flags.Application.Authentication.Queries.Login;
using Flags.Application.Persistance.Repositories;
using Flags.Domain.Common.Exceptions;
using Flags.Domain.UserRoot.Entities;
using Microsoft.Extensions.Options;

namespace Flags.Infrastructure.Services.Auth;

public class LoginByEmailQueryHandler(
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
        var user = await userRepository.GetByEmailAsync(query.Email.Trim()) ??
            throw new NotFoundException($"Пользователя с email {query.Email.Trim()} не существует.");

        var passwordsMatch = passwordHasher.Verify(query.Password, user.Password.Value);

        if (!passwordsMatch)
            throw new InvalidCredentialsException("Неверный логин или пароль!");

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
