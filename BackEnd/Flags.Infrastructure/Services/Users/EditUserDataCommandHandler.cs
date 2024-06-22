using ErrorOr;
using Flags.Domain.Common.Errors;
using Flags.Application.Users.Command;
using Flags.Domain.UserRoot;
using Flags.Application.Common.Persistance;

namespace Flags.Infrastructure.Services.Users;
public class EditUserDataCommandHandler(
    IUserRepository userRepository) : IEditUserDataCommandHandler
{
    public async Task<ErrorOr<User>> Handle(EditUserDataCommand command, CancellationToken cancellationToken)
    {
        var model = await userRepository.GetByPhoneAsync(command.Phone);
        if (model is null)
            return Errors.User.InvalidInput;

        var user = User.Create(model.Id, command.FirstName, command.LastName, model.Phone, model.Email, model.Password, command.AvatarId);
        await userRepository.UpdateAsync(user);
        return user;
    }
}
