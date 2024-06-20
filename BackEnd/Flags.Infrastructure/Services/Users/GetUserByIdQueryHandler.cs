using ErrorOr;
using Flags.Application.Common.Interfaces.Persistance;
using Flags.Application.Common.Interfaces.Services.Users;
using Flags.Application.Users.Queries;
using Flags.Domain.Common.Errors;
using Flags.Domain.UserRoot;

namespace Flags.Infrastructure.Services.Users;

public class GetUserByIdQueryHandler(
    IUserRepository userRepository
) : IGetUserByIdQueryHandler
{
    public async Task<ErrorOr<User?>> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
    {
        var isParsed = Guid.TryParse(request.Id, out var guid);
        if (!isParsed) return Errors.User.InvalidInput;

        var result = await userRepository.GetByIdAsync(guid);
        if (result is not null)
        {
            return result;
        }
        else
        {
            return Errors.User.NotFound;
        }
    }
};