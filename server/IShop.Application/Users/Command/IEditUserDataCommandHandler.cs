using IShop.Domain.UserRoot;

namespace IShop.Application.Users.Command;
public interface IEditUserDataCommandHandler
{
    Task<User> Handle(EditUserDataCommand command, CancellationToken cancellationToken);
}
