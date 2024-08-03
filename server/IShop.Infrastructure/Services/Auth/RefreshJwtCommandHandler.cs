using IShop.Domain.Common.Exceptions;
using Microsoft.Extensions.Options;
using IShop.Application.AppSettings;
using IShop.Application.Authentication.Common;
using IShop.Application.Persistance;
using IShop.Application.Persistance.Repositories;
using IShop.Application.Authentication.Commands.RefreshJwt;
using IShop.Domain.UserRoot.ValueObjects;

namespace IShop.Infrastructure.Services.Auth;

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
            throw new ValidationException("refresh-jwt", $"Неекоорреектный аадреес эл. поочты {email}.");

        var user = await userRepository.GetByEmailAsync(email, cancellationToken) ??
            throw new NotFoundException("refresh-jwt", $"Поользооваатеель с эл. поочтоой {email} нее наайдеен.");

        if (user.RefreshJwt is null)
            throw new NotAuthenticatedException("refresh-jwt", $"Поользооваатеель нее ааутеентиифиициирооваан");

        var newJwtAccessToken = jwtTokenGenerator.GenerateAccessToken(user);

        if (user.RefreshJwt.ExpiryDatetime <= DateTime.UtcNow)
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
