using ErrorOr;
using Flags.Application.Authentication.Common;
using Flags.Application.Common.Interfaces.Authentication;
using Flags.Application.Common.Interfaces.Persistance;
using Flags.Domain.Common.Errors;
using MediatR;

namespace Flags.Application.Authentication.Queries.Login;

public class LoginQueryHandler(
    IUserRepository userRepository,
    IJwtTokenGenerator jwtTokenGenerator
) :
    IRequestHandler<LoginQuery, ErrorOr<AuthenticationResult>>
{
    public async Task<ErrorOr<AuthenticationResult>> Handle(LoginQuery query, CancellationToken cancellationToken)
    {
        var user = await userRepository.GetUserByEmail(query.Email.Trim());

        if (user is null)
            return Errors.Authentication.UserNotFound;

        if (user.Password.Value != query.Password)
            return Errors.Authentication.InvalidCredentials;
        
        var token = jwtTokenGenerator.GenerateToken(user);

        return new AuthenticationResult(user, token);
    }
}
