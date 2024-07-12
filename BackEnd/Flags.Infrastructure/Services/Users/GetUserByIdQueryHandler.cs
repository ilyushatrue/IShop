using Flags.Application.Users.Queries;
using Flags.Domain.UserRoot;
using Flags.Domain.Common.Exceptions;
using Flags.Application.Persistance.Repositories;

namespace Flags.Infrastructure.Services.Users;

public class GetUserByIdQueryHandler(
    IUserRepository userRepository
) : IGetUserByIdQueryHandler
{
    public async Task<User> Handle(Guid id, CancellationToken cancellationToken)
    {
        var result = await userRepository.GetByIdAsync(id) ??
            throw new NotFoundException(
                "get-user-by-id",
                $"Пользователя с id={id} не существует",
                "Что-то пошло не так. Обратитесь к администратору.");

        return result;
    }
};