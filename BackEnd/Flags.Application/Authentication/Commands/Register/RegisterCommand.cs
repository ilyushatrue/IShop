using ErrorOr;
using Flags.Application.Authentication.Common;
using MediatR;

namespace Flags.Application.Authentication.Commands.Register;

public record RegisterCommand(
	string FirstName, 
	string LastName, 
	string Email,
	string Phone,
	string Password,
	Guid? AvatarId) : IRequest<ErrorOr<AuthenticationResult>>;