using IShop.Domain.UserRoot.Entities;

namespace IShop.Application.Persistance.Repositories;
public interface IUserEmailConfirmationRepository
{
    void Create(UserEmailConfirmation emailConfirmation);
    Task<UserEmailConfirmation?> GetByTokenAsync(Guid emailConfirmationToken, CancellationToken cancellationToken);
    Task<bool> ValidateTokenAsync(Guid emailConfirmationToken, CancellationToken cancellationToken);
}
