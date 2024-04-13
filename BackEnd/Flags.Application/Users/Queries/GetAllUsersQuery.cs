using ErrorOr;
using Flags.Domain.User.Entities;
using MediatR;

namespace Flags.Application.Users.Queries;

public record GetAllUsersQuery : IRequest<ErrorOr<List<User>>>;