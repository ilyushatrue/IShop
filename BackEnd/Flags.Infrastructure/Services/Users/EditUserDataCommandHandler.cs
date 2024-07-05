using Flags.Application.Users.Command;
using Flags.Domain.UserRoot;
using Flags.Domain.Common.Exceptions;
using Flags.Application.Persistance.Repositories;

namespace Flags.Infrastructure.Services.Users;
public class EditUserDataCommandHandler(
    IUserRepository userRepository) : IEditUserDataCommandHandler
{
    public async Task<User> Handle(EditUserDataCommand command, CancellationToken cancellationToken)
    {
        var user = await userRepository.GetByEmailAsync(command.Email) ??
            throw new NotFoundException($"Пользователь с эл. почтой {command.Email} не найден.");

        user.Update(command.FirstName, command.LastName, command.Phone, command.Email, command.AvatarId);
        await userRepository.UpdateAsync(user);
        return user;
    }
}
