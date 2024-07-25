using IShop.Domain.UserRoot;

namespace IShop.Application.Users.Queries;
public interface IGetUserByIdQueryHandler
{
    Task<User> Handle(Guid id, CancellationToken cancellationToken);
}
