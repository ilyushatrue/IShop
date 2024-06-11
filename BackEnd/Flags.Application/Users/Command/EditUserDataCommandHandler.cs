using ErrorOr;
using Flags.Application.Common.Interfaces.Persistance;
using MediatR;

namespace Flags.Application.Users.Command;
public class EditUserDataCommandHandler(
    IUserRepository userRepository) : IRequestHandler<EditUserDataCommand, ErrorOr<bool>>
{
    public async Task<ErrorOr<bool>> Handle(EditUserDataCommand request, CancellationToken cancellationToken)
    {
        await userRepository.UpdateAsync(request.User);
        return true;
    }
}
