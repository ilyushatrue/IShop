using IShop.Domain.Common.Exceptions;
using IShop.Application.AppSettings;
using IShop.Application.Authentication.Commands.ConfirmEmail;
using IShop.Application.Authentication.Common;
using IShop.Application.Common;
using IShop.Application.Persistance;
using IShop.Application.Persistance.Repositories;
using IShop.Domain.UserRoot.Entities;
using Microsoft.Extensions.Options;

namespace IShop.Infrastructure.Services.Auth;
public class ConfirmEmailCommandHandler(
    IJwtTokenGenerator jwtTokenGenerator,
    IUserEmailConfirmationRepository emailConfirmationRepository,
    IOptions<RefreshJwtSettings> refreshJwtSettings,
    IDbManager dbManager,
    IDateTimeProvider dateTimeProvider
    ) : IConfirmEmailCommandHandler
{
    private readonly RefreshJwtSettings _refreshJwtSettings = refreshJwtSettings.Value;
    private readonly DateTime _utcNow = dateTimeProvider.UtcNow;
    public async Task<AuthenticationResult> Handle(Guid emailConfirationToken, CancellationToken cancellationToken)
    {
        var emailConfirmation = await emailConfirmationRepository.GetByTokenAsync(emailConfirationToken, cancellationToken) ??
            throw new Exception("Не удалось подтвердить электронную почту :(");

        if (emailConfirmation.IsConfirmed)
            throw new InvalidUsageException("Email уже подтвержден ☺", "email-already-confirmed");

        if (_utcNow > emailConfirmation.ExpiryDateTime)
            throw new ExpirationException("expiration-exception", $"Время действия ссылки вышло. {_utcNow} > {emailConfirmation.ExpiryDateTime}", "Время действия ссылки вышло.");

        emailConfirmation.SetIsConfirmed();

        var user = emailConfirmation.User!;

        var jwtAccessToken = jwtTokenGenerator.GenerateAccessToken(user);
        user.SetRefreshToken(RefreshJwt.Create(user.Id, _refreshJwtSettings.ExpiryDays));

        await dbManager.SaveChangesAsync(cancellationToken);
        return new AuthenticationResult(user, jwtAccessToken);
    }
}
