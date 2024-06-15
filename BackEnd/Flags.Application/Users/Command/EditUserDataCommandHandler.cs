using ErrorOr;
using Flags.Application.Common.Interfaces.Persistance;
using Flags.Domain.UserEntity;
using Flags.Domain.Common.Errors;
using MediatR;

namespace Flags.Application.Users.Command;
public class EditUserDataCommandHandler(
    IUserRepository userRepository) : IRequestHandler<EditUserDataCommand, ErrorOr<User>>
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
