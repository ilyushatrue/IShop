using Flags.Application.Users.Command;
using Flags.Domain.UserRoot;
using Flags.Application.Common.Persistance;
using Flags.Domain.Common.Exceptions;

namespace Flags.Infrastructure.Services.Users;
public class EditUserDataCommandHandler(
    IUserRepository userRepository) : IEditUserDataCommandHandler
{
    public async Task<User> Handle(EditUserDataCommand command, CancellationToken cancellationToken)
    {
        var model = await userRepository.GetByPhoneAsync(command.Phone) ??
            throw new NotFoundException($"Пользователь с телефоном {command.Phone} не найден.");

        var user = User.Create(model.Id, command.FirstName, command.LastName, model.Phone, model.Email, model.Password, command.AvatarId);
        await userRepository.UpdateAsync(user);
        return user;
    }
}
