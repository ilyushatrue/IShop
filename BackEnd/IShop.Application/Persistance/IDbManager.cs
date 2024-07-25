using Microsoft.EntityFrameworkCore.Storage;
using System.Linq.Expressions;

namespace IShop.Application.Persistance;
public interface IDbManager
{
    Task<IDbContextTransaction> BeginTransactionAsync(CancellationToken cancellationToken);
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    Task<int> CountRecordsAsync<T>(CancellationToken cancellationToken) where T : class;
    Task<int> CountRecordsAsync<T>(Expression<Func<T, bool>> predicate, CancellationToken cancellationToken) where T : class;
}
