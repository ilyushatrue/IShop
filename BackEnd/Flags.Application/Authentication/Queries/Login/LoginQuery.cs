using ErrorOr;
using Flags.Application.Authentication.Common;
using MediatR;

namespace Flags.Application.Authentication.Queries.Login;

public record LoginQuery(
    string Email,
    string Password) : IRequest<ErrorOr<AuthenticationResult>>;