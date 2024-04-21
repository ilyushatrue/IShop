using ErrorOr;
using Flags.Domain.UserEntity;
using MediatR;

namespace Flags.Application.Users.Queries;

public record GetAllUsersQuery : IRequest<ErrorOr<List<User>>>;