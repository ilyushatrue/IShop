using Flags.Application.AppSettings;
using Flags.Application.Authentication.Commands.VerifyEmail;
using Flags.Application.Authentication.Common;
using Flags.Application.Common.Persistance;
using Microsoft.Extensions.Options;

namespace Flags.Infrastructure.Services.Auth;
public class VerifyEmailCommandHandler(
    IOptions<ClientSettings> clientSettings,
    IRefreshJwtRepository refreshJwtRepository,
    IJwtTokenGenerator jwtTokenGenerator,
    IUserRepository userRepository
    ) : IVerifyEmailCommandHandler
{
    public async Task<AuthenticationResult?> Handle(Guid userId)
    {
        var user = await userRepository.GetByIdAsync(userId);
        if (user is null)
            return null;

        if (user.Email.IsVerified)
            throw new Exception("Email уже подтвержден.");
        user.Email.SetIsVerified();
        await userRepository.UpdateAsync(user);
        var jwtAccessToken = jwtTokenGenerator.GenerateAccessToken(user);
        await refreshJwtRepository.CreateAsync(user.Id);

        return new AuthenticationResult(user, jwtAccessToken);
    }
}
