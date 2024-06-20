using ErrorOr;
using Flags.Application.Authentication.Common;
using Flags.Application.Authentication.Queries;

namespace Flags.Application.Common.Interfaces.Services.Auth;
public interface ILoginByEmailQueryHandler 
{
    Task<ErrorOr<AuthenticationResult>> Handle(LoginByEmailQuery query, CancellationToken cancellationToken);
}
