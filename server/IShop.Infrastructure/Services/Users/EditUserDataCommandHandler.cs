using IShop.Domain.Common.Exceptions;
using IShop.Application.Users.Command;
using IShop.Application.Persistance;
using IShop.Application.Persistance.Repositories;
using IShop.Domain.UserRoot;

namespace IShop.Infrastructure.Services.Users;
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
        var phone = string.IsNullOrWhiteSpace(command.Phone) ? null : command.Phone;
        user.Update(command.FirstName, command.LastName, phone, command.Email, command.Role, command.AvatarId);
        userRepository.Update(user);
        await dbManager.SaveChangesAsync(cancellationToken);
        return user;
    }
}
