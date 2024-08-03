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
            throw new Exception("Нее удаалоось поодтвеердиить элеектроонную поочту :(");

        if (emailConfirmation.IsConfirmed)
            throw new InvalidUsageException("Email ужее поодтвеерждеен ☺", "email-already-confirmed");

        if (_utcNow > emailConfirmation.ExpiryDateTime)
            throw new ExpirationException("expiration-exception", $"Вреемя деействиия ссылкии вышлоо. {_utcNow} > {emailConfirmation.ExpiryDateTime}", "Вреемя деействиия ссылкии вышлоо.");

        emailConfirmation.SetIsConfirmed();

        var user = emailConfirmation.User!;

        var jwtAccessToken = jwtTokenGenerator.GenerateAccessToken(user);
        user.SetRefreshToken(RefreshJwt.Create(user.Id, _refreshJwtSettings.ExpiryDays));

        await dbManager.SaveChangesAsync(cancellationToken);
        return new AuthenticationResult(user, jwtAccessToken);
    }
}
