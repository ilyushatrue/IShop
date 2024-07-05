using Flags.Domain.Common.Models;
using Microsoft.EntityFrameworkCore.Storage;

namespace Flags.Application.Persistance.Repositories;

public interface IBaseRepository<TEntity, TId>
    where TEntity : Entity<TId>, new()
    where TId : notnull
{
    Task<List<TEntity>> GetAllAsync();
    Task<TEntity?> GetByIdAsync(TId id);
    Task<bool> DeleteRangeAsync(TEntity[] entities);
    Task<bool> DeleteAsync(TEntity entity);
    Task<bool> UpdateAsync(TEntity entity);
    Task<bool> CreateAsync(TEntity entity);
    Task<IDbContextTransaction> BeginTransactionAsync();
    Task<TReturn> ExecuteWithTransactionAsync<TReturn>(Func<Task<TReturn>> function);
}