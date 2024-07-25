using IShop.Domain.UserRoot;

namespace IShop.Application.Users.Queries;
public interface IGetAllUsersQueryHandler
{
    Task<List<User>> Handle(CancellationToken cancellationToken);
}
