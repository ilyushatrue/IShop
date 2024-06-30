using Flags.Application.Authentication.Commands.Login;
using Flags.Application.Authentication.Common;
using Flags.Application.Authentication.Queries;
using Flags.Application.Common.Persistance;
using Flags.Domain.Common.Exceptions;

namespace Flags.Infrastructure.Services.Auth;

public class LoginByEmailQueryHandler(
    IUserRepository userRepository,
    IJwtTokenGenerator jwtTokenGenerator,
    IRefreshJwtRepository refreshJwtRepository,
    IPasswordHasher passwordHasher
) : ILoginByEmailQueryHandler
{
    public async Task<AuthenticationResult> Handle(
        LoginByEmailQuery query,
        CancellationToken cancellationToken)
    {
        var user = await userRepository.GetByEmailAsync(query.Email.Trim()) ??
            throw new NotFoundException($"������������ � email {query.Email.Trim()} �� ����������.");

        var passwordsMatch = passwordHasher.Verify(query.Password, user.Password.Value);

        if (!passwordsMatch)
            throw new InvalidCredentialsException("�������� ����� ��� ������!");

        if (!user.Email.IsVerified)
            throw new InvalidUsageException("�� �� ����������� ���� ��. �����!");

        var jwtAccessToken = jwtTokenGenerator.GenerateAccessToken(user);

        if (user.RefreshJwt is null)
            await refreshJwtRepository.CreateAsync(user.Id);
        else
            await refreshJwtRepository.UpdateAsync(user.RefreshJwt);

        return new AuthenticationResult(user, jwtAccessToken);
    }
}
