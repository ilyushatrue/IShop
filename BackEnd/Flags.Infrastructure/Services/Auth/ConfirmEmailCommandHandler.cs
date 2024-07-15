using Flags.Application.AppSettings;
using Flags.Application.Authentication.Commands.ConfirmEmail;
using Flags.Application.Authentication.Common;
using Flags.Application.Common;
using Flags.Application.Persistance;
using Flags.Application.Persistance.Repositories;
using Flags.Domain.Common.Exceptions;
using Flags.Domain.UserRoot.Entities;
using Microsoft.Extensions.Options;

namespace Flags.Infrastructure.Services.Auth;
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
