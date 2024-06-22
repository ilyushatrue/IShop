using ErrorOr;
using Flags.Application.Authentication.Common;
using Flags.Application.Authentication.Queries;

namespace Flags.Application.Authentication.Commands.Login;
public interface ILoginByPhoneQueryHandler
{
    Task<ErrorOr<AuthenticationResult>> Handle(LoginByPhoneQuery query, CancellationToken cancellationToken);
}
