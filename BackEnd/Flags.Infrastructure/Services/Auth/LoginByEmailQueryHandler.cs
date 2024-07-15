using Flags.Application.AppSettings;
using Flags.Application.Authentication.Common;
using Flags.Application.Authentication.Queries.Login;
using Flags.Application.Persistance;
using Flags.Application.Persistance.Repositories;
using Flags.Domain.Common.Exceptions;
using Flags.Domain.UserRoot.Entities;
using Microsoft.Extensions.Options;

namespace Flags.Infrastructure.Services.Auth;

public class LoginByEmailQueryHandler(
    IDbManager dbManager,
    IUserRepository userRepository,
    IJwtTokenGenerator jwtTokenGenerator,
    IRefreshJwtRepository refreshJwtRepository,
    IPasswordHasher passwordHasher,
    IOptions<RefreshJwtSettings> refreshJwtSettings
) : ILoginByEmailQueryHandler
{
    private readonly RefreshJwtSettings _refreshJwtSettings = refreshJwtSettings.Value;

    public async Task<AuthenticationResult> Handle(
        LoginByEmailQuery query,
        CancellationToken cancellationToken)
    {
        var user = await userRepository.GetByEmailAsync(query.Email.Trim(), cancellationToken) ??
            throw new NotFoundException(
                "login-by-email",
                $"������������ � email {query.Email.Trim()} �� ����������.",
                "�������� ����� ��� ������!");

        var passwordsMatch = passwordHasher.Verify(query.Password, user.Password.Value);

        if (!passwordsMatch)
            throw new InvalidCredentialsException(
                "login-by-email",
                "�������� ����� ��� ������!",
                "�������� ����� ��� ������!");

        if (!user.EmailConfirmation!.IsConfirmed)
            throw new InvalidUsageException(
                "email-not-confirmed",
                "��. ����� �� �����������!",
                "�� �� ����������� ���� ��. �����!");

        var jwtAccessToken = jwtTokenGenerator.GenerateAccessToken(user);

        if (user.RefreshJwt is null)
        {
            var refreshJwt = RefreshJwt.Create(user.Id, _refreshJwtSettings.ExpiryDays);
            refreshJwtRepository.Create(refreshJwt);
        }
        else
        {
            refreshJwtRepository.Update(user.RefreshJwt);
        }
        await dbManager.SaveChangesAsync(cancellationToken);
        return new AuthenticationResult(user, jwtAccessToken);
    }
}
