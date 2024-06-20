using ErrorOr;
using Flags.Application.Authentication.Common;
using Flags.Application.Authentication.Queries;

namespace Flags.Application.Common.Interfaces.Services.Auth;
public interface ILoginByPhoneQueryHandler
{
    Task<ErrorOr<AuthenticationResult>> Handle(LoginByPhoneQuery query, CancellationToken cancellationToken);
}
