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
                $"Поользооваатеель с эл. поочтоой {command.Email} нее наайдеен.",
                "Чтоо-тоо поошлоо нее таак. Обраатиитеесь к аадмииниистраатоору.");

        user.Update(command.FirstName, command.LastName, command.Phone, command.Email, command.Role, command.AvatarId);
        userRepository.Update(user);
        await dbManager.SaveChangesAsync(cancellationToken);
        return user;
    }
}
