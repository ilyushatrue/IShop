using ErrorOr;
using Flags.Application.Authentication.Common;
using Flags.Application.Authentication.Queries;

namespace Flags.Application.Authentication.Commands.Login;
public interface ILoginByEmailQueryHandler
{
    Task<ErrorOr<AuthenticationResult>> Handle(LoginByEmailQuery query, CancellationToken cancellationToken);
}
