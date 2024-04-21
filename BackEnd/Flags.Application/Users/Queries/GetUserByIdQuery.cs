using ErrorOr;
using Flags.Domain.UserEntity;
using MediatR;

namespace Flags.Application.Users.Queries;

public record GetUserByIdQuery(
    string Id
) : IRequest<ErrorOr<User?>>;