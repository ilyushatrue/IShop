using IShop.Domain.Common.Exceptions;
using IShop.Application.Persistance.Repositories;
using IShop.Application.Users.Queries;
using IShop.Domain.UserRoot;

namespace IShop.Infrastructure.Services.Users;

public class GetUserByIdQueryHandler(
    IUserRepository userRepository
) : IGetUserByIdQueryHandler
{
    public async Task<User> Handle(Guid id, CancellationToken cancellationToken)
    {
        var result = await userRepository.GetByIdAsync(id, cancellationToken) ??
            throw new NotFoundException(
                "get-user-by-id",
                $"Пользователя с id={id} не существует",
                "Что-то пошло не так. Обратитесь к администратору.");

        return result;
    }
};