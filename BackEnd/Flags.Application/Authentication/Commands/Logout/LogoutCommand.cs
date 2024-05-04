using ErrorOr;
using MediatR;

namespace Flags.Application.Authentication.Commands.Logout;

public record LogoutCommand(Guid UserId) : IRequest<ErrorOr<bool>>;