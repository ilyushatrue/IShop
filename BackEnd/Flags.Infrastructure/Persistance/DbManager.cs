using Flags.Application.Persistance;
using Microsoft.EntityFrameworkCore.Storage;

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
}
