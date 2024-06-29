using Flags.Application.Authentication.Common;
using Flags.Application.Authentication.Commands.RefreshJwt;
using Flags.Application.Common.Persistance;
using Flags.Domain.UserRoot.ValueObjects;
using Flags.Domain.Common.Exceptions;

namespace Flags.Infrastructure.Services.Auth;

public class RefreshJwtCommandHandler(
    IJwtTokenGenerator jwtTokenGenerator,
    IRefreshJwtRepository refreshJwtRepository,
    IUserRepository userRepository
) : IRefreshJwtCommandHandler
{
    public async Task<AuthenticationResult> Handle(string userPhone, CancellationToken cancellationToken)
    {
        userPhone = Phone.Trim(userPhone);
        if (!Phone.Validate(userPhone))
            throw new ValidationException("Некорректный номер телефона.");

        var user = await userRepository.GetByPhoneAsync(userPhone) ??
            throw new NotFoundException($"Пользователь с номером телефона {userPhone} не найден."); 

        if (user.RefreshJwt is null)
            throw new NotAuthenticatedException();

        var newJwtAccessToken = jwtTokenGenerator.GenerateAccessToken(user);

        if (user.RefreshJwt.ExpiryDatetime <= DateTime.Now)
            await refreshJwtRepository.UpdateAsync(user.RefreshJwt);

        return new AuthenticationResult(
            user,
            newJwtAccessToken);
    }
}
