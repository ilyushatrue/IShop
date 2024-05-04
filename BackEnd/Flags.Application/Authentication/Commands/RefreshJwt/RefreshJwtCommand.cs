using ErrorOr;
using Flags.Application.Authentication.Common;
using MediatR;

namespace Flags.Application.Authentication.Commands.RefreshJwt;

public record RefreshJwtCommand(Guid UserId) : IRequest<ErrorOr<AuthenticationResult>>;