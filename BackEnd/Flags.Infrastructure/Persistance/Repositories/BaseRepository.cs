using Flags.Application.Common.Persistance;
using Flags.Domain.Common.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace Flags.Infrastructure.Persistance.Repositories;

public class BaseRepository<TEntity, TId>(
    FlagDbContext flagDbContext
) : IBaseRepository<TEntity, TId>
    where TEntity : Entity<TId>, new()
    where TId : notnull
{
    public async Task<bool> CreateAsync(TEntity entity)
    {
        flagDbContext.Add(entity);
        return await SaveChangesAsync();
    }
    public async Task<bool> DeleteAsync(TEntity entity)
    {
        flagDbContext.Remove(entity);
        return await SaveChangesAsync();
    }

    public async Task<bool> DeleteRangeAsync(TEntity[] entities)
    {
        flagDbContext.RemoveRange(entities);
        return await SaveChangesAsync();
    }

    public async Task<List<TEntity>> GetAllAsync()
    {
        return await flagDbContext
            .Set<TEntity>()
            .ToListAsync();
    }

    public async Task<TEntity?> GetByIdAsync(TId id)
    {
        return await flagDbContext
            .Set<TEntity>()
            .Where(x => x.Id.GetHashCode() == id.GetHashCode())
            .SingleOrDefaultAsync();
    }

    public async Task<bool> UpdateAsync(TEntity entity)
    {
        flagDbContext.Update(entity);
        return await SaveChangesAsync();
    }
    public async Task<IDbContextTransaction> BeginTransactionAsync()
    {
        return await flagDbContext.Database.BeginTransactionAsync();
    }

    public async Task<TReturn> ExecuteWithTransactionAsync<TReturn>(Func<Task<TReturn>> function)
    {
        await using var transaction = await BeginTransactionAsync();
        try
        {
            var result = await function.Invoke();
            await transaction.CommitAsync();
            return result;
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }

    private async Task<bool> SaveChangesAsync()
    {
        var result = await flagDbContext.SaveChangesAsync();
        return result > 0;
    }
}