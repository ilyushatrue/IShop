using ErrorOr;
using Flags.Application.Common.Interfaces.Persistance;
using Flags.Domain.Common.Errors;
using Flags.Domain.UserEntity;
using MediatR;

namespace Flags.Application.Users.Queries;

public class GetUserByIdQueryHandler(
    IUserRepository userRepository
) : IRequestHandler<GetUserByIdQuery, ErrorOr<User?>>
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