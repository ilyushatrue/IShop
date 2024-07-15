using Flags.Application.Users.Command;
using Flags.Domain.UserRoot;
using Flags.Domain.Common.Exceptions;
using Flags.Application.Persistance.Repositories;
using Flags.Application.Persistance;

namespace Flags.Infrastructure.Services.Users;
public class EditUserDataCommandHandler(
    IUserRepository userRepository,
    IDbManager dbManager) : IEditUserDataCommandHandler
{
    public async Task<User> Handle(EditUserDataCommand command, CancellationToken cancellationToken)
    {
        var user = await userRepository.GetByEmailAsync(command.Email, cancellationToken) ??
            throw new NotFoundException(
                "edit-user-data",
                $"Пользователь с эл. почтой {command.Email} не найден.",
                "Что-то пошло не так. Обратитесь к администратору.");

        user.Update(command.FirstName, command.LastName, command.Phone, command.Email, command.Role, command.AvatarId);
        userRepository.Update(user);
        await dbManager.SaveChangesAsync(cancellationToken);
        return user;
    }
}
