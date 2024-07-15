namespace Flags.Infrastructure.Persistance.Extensions;

public static class PersistanceExtensions
{
	public static async Task<TReturn> ExecuteWithTransactionAsync<TReturn>(this AppDbContext dbContext, Func<Task<TReturn>> function)
	{
		await using var transaction = await dbContext.Database.BeginTransactionAsync();
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
}