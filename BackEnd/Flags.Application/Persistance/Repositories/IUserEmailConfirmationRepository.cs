using Flags.Domain.UserRoot.Entities;

namespace Flags.Application.Persistance.Repositories;
public interface IUserEmailConfirmationRepository
{
    Task<int> CreateAsync(UserEmailConfirmation emailConfirmation);
    Task<UserEmailConfirmation?> GetByTokenAsync(Guid emailConfirmationToken);
}
