using ErrorOr;
using Flags.Application.Authentication.Common;
using MediatR;

namespace Flags.Application.Authentication.Commands.RefreshJwt;

public record RefreshJwtCommand(string UserPhone) : IRequest<ErrorOr<AuthenticationResult>>;