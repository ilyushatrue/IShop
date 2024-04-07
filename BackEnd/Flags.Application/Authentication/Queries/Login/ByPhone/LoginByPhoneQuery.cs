using ErrorOr;
using Flags.Application.Authentication.Common;
using MediatR;

namespace Flags.Application.Authentication.Queries.Login.ByPhone;

public record LoginByPhoneQuery(
    string Phone,
    string Password) : IRequest<ErrorOr<AuthenticationResult>>;