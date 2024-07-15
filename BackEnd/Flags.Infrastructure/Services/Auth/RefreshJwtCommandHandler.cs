using Flags.Application.Authentication.Common;
using Flags.Application.Authentication.Commands.RefreshJwt;
using Flags.Domain.UserRoot.ValueObjects;
using Flags.Domain.Common.Exceptions;
using Microsoft.Extensions.Options;
using Flags.Application.AppSettings;
using Flags.Application.Persistance.Repositories;
using Flags.Application.Persistance;

namespace Flags.Infrastructure.Services.Auth;

public class RefreshJwtCommandHandler(
    IDbManager dbManager,
    IJwtTokenGenerator jwtTokenGenerator,
    IRefreshJwtRepository refreshJwtRepository,
    IUserRepository userRepository,
    IOptions<RefreshJwtSettings> refreshJwtSettings
) : IRefreshJwtCommandHandler
{
    private readonly RefreshJwtSettings _refreshJwtSettings = refreshJwtSettings.Value;
    public async Task<AuthenticationResult> Handle(string email, CancellationToken cancellationToken)
    {
        if (!Email.Validate(email))
            throw new ValidationException("refresh-jwt", $"Некорректный адрес эл. почты {email}.");

        var user = await userRepository.GetByEmailAsync(email, cancellationToken) ??
            throw new NotFoundException("refresh-jwt", $"Пользователь с эл. почтой {email} не найден.");

        if (user.RefreshJwt is null)
            throw new NotAuthenticatedException("refresh-jwt", $"Пользователь не аутентифицирован");

        var newJwtAccessToken = jwtTokenGenerator.GenerateAccessToken(user);

        if (user.RefreshJwt.ExpiryDatetime <= DateTime.Now)
        {
            user.RefreshJwt.Update(_refreshJwtSettings.ExpiryDays);
            refreshJwtRepository.Update(user.RefreshJwt);
        }

        await dbManager.SaveChangesAsync(cancellationToken);
        return new AuthenticationResult(
            user,
            newJwtAccessToken);
    }
}
