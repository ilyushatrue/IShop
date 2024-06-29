using Flags.Application.Common.Persistance;
using Flags.Application.Users.Queries;
using Flags.Domain.UserRoot;
using Flags.Domain.Common.Exceptions;

namespace Flags.Infrastructure.Services.Users;

public class GetUserByIdQueryHandler(
    IUserRepository userRepository
) : IGetUserByIdQueryHandler
{
    public async Task<User> Handle(Guid id, CancellationToken cancellationToken)
    {
        var result = await userRepository.GetByIdAsync(id) ??
            throw new NotFoundException($"Пользователя с id={id} не существует");

        return result;
    }
};