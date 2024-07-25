using IShop.Application.Persistance;
using IShop.Domain.Common.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using System.Linq.Expressions;

namespace IShop.Infrastructure.Persistance;
public class DbManager(AppDbContext dbContext) : IDbManager
{
    public async Task<IDbContextTransaction> BeginTransactionAsync(CancellationToken cancellationToken)
    {
        return await dbContext.Database.BeginTransactionAsync(cancellationToken);
    }

    public async Task<int> CountRecordsAsync<T>(CancellationToken cancellationToken) where T : class
    {
        return await dbContext.Set<T>().CountAsync(cancellationToken);
    }

    public async Task<int> CountRecordsAsync<T>(Expression<Func<T, bool>> predicate, CancellationToken cancellationToken) where T : class
    {
        return await dbContext.Set<T>().Where(predicate).CountAsync(cancellationToken);
    }

    public async Task<int> SaveChangesAsync(CancellationToken cancellationToken)
    {
        return await dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task SyncronizeRecordsAsync<T, TId>(IEnumerable<T> overwriteData, CancellationToken cancellationToken) where TId : notnull where T : Entity<TId>
    {
        await dbContext.SyncronizeRecordsAsync<T, TId>(overwriteData, cancellationToken);
    }
}
