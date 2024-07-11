using Flags.Application.Persistance;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using System.Linq.Expressions;

namespace Flags.Infrastructure.Persistance;
public class DbManager(FlagDbContext dbContext) : IDbManager
{
    public async Task<IDbContextTransaction> BeginTransactionAsync()
    {
        return await dbContext.Database.BeginTransactionAsync();
    }

    public async Task<int> SaveChangesAsync()
    {
        return await dbContext.SaveChangesAsync();
    }

    public async Task<int> CountRecordsAsync<T>() where T : class
    {
        return await dbContext.Set<T>().CountAsync();
    }

    public async Task<int> CountRecordsAsync<T>(Expression<Func<T, bool>> predicate) where T : class
    {
        return await dbContext.Set<T>().Where(predicate).CountAsync();
    }
}
