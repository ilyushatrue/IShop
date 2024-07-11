using Microsoft.EntityFrameworkCore.Storage;
using System.Linq.Expressions;

namespace Flags.Application.Persistance;
public interface IDbManager
{
    Task<IDbContextTransaction> BeginTransactionAsync();
    Task<int> SaveChangesAsync();
    Task<int> CountRecordsAsync<T>() where T : class;
    Task<int> CountRecordsAsync<T>(Expression<Func<T, bool>> predicate) where T : class;
}
