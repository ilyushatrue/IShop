using ErrorOr;
using Flags.Application.Authentication.Common;
using MediatR;

namespace Flags.Application.Authentication.Queries.Login.ByEmail;

public record LoginByEmailQuery(
    string Email,
    string Password) : IRequest<ErrorOr<AuthenticationResult>>;