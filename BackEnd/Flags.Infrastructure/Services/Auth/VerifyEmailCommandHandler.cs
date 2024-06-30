using Flags.Application.Authentication.Commands.VerifyEmail;
using Flags.Application.Authentication.Common;
using Flags.Application.Common.Persistance;
using Flags.Domain.Common.Exceptions;

namespace Flags.Infrastructure.Services.Auth;
public class VerifyEmailCommandHandler(
    IRefreshJwtRepository refreshJwtRepository,
    IJwtTokenGenerator jwtTokenGenerator,
    IUserRepository userRepository
    ) : IVerifyEmailCommandHandler
{
    public async Task<AuthenticationResult> Handle(Guid userId)
    {
        var user = await userRepository.GetByIdAsync(userId) ??
            throw new Exception("Не удалось подтвердить электронную почту :(");

        if (user.Email.IsVerified)
            throw new InvalidUsageException("Email уже подтвержден ☺");

        user.Email.SetIsVerified();
        await userRepository.UpdateAsync(user);
        var jwtAccessToken = jwtTokenGenerator.GenerateAccessToken(user);
        await refreshJwtRepository.CreateAsync(user.Id);

        return new AuthenticationResult(user, jwtAccessToken);
    }
}
