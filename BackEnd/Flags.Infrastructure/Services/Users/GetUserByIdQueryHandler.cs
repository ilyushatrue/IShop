using ErrorOr;
using Flags.Application.Common.Persistance;
using Flags.Application.Users.Queries;
using Flags.Domain.Common.Errors;
using Flags.Domain.UserRoot;

namespace Flags.Infrastructure.Services.Users;

public class GetUserByIdQueryHandler(
    IUserRepository userRepository
) : IGetUserByIdQueryHandler
{
    public async Task<ErrorOr<User?>> Handle(string id, CancellationToken cancellationToken)
    {
        var isParsed = Guid.TryParse(id, out var guid);
        if (!isParsed) return Errors.User.InvalidInput;

        var result = await userRepository.GetByIdAsync(guid);
        if (result is null)
            return Errors.User.NotFound;
        else
            return result;
    }
};