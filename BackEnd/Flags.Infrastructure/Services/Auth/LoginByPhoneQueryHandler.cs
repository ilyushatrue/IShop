using Flags.Application.Authentication.Commands.Login;
using Flags.Application.Authentication.Common;
using Flags.Application.Common.Persistance;
using Flags.Domain.Common.Exceptions;
using Flags.Domain.UserRoot.ValueObjects;

namespace Flags.Infrastructure.Services.Auth;

public class LoginByPhoneQueryHandler(
    IUserRepository userRepository,
    IJwtTokenGenerator jwtTokenGenerator,
    IRefreshJwtRepository refreshJwtRepository,
    IPasswordHasher passwordHasher
) : ILoginByPhoneQueryHandler
{
    public async Task<AuthenticationResult> Handle(string phone, string password, CancellationToken cancellationToken)
    {
        phone = Phone.Trim(phone);

        var user = await userRepository.GetByPhoneAsync(phone) ??
            throw new NotFoundException($"������������ � ������� �������� {phone} �� ������.");

        var passwordsMatch = passwordHasher.Verify(password, user.Password.Value);

        if (!passwordsMatch)
            throw new InvalidCredentialsException($"�������� ����� ��� ������.");

        var jwtAccessToken = jwtTokenGenerator.GenerateAccessToken(user);

        if (user.RefreshJwt is null)
            await refreshJwtRepository.CreateAsync(user.Id);
        else
            await refreshJwtRepository.UpdateAsync(user.RefreshJwt);

        return new AuthenticationResult(user, jwtAccessToken);
    }
}
