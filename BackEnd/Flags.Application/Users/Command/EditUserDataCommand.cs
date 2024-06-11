using ErrorOr;
using Flags.Domain.UserEntity;
using MediatR;

namespace Flags.Application.Users.Command;

public record EditUserDataCommand(
    User User) : IRequest<ErrorOr<bool>>;
