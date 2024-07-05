using Microsoft.EntityFrameworkCore.Storage;

namespace Flags.Application.Persistance;
public interface IDbManager
{
    Task<IDbContextTransaction> BeginTransactionAsync();
    Task<int> SaveChangesAsync();
}
