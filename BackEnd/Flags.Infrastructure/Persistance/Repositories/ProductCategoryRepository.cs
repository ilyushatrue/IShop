using Flags.Application.Persistance.Repositories;
using Flags.Domain.ProductRoot.Entities;
using Microsoft.EntityFrameworkCore;

namespace Flags.Infrastructure.Persistance.Repositories;
public class ProductCategoryRepository(FlagDbContext dbContext) : IProductCategoryRepository
{
    public void CreateAsync(ProductCategory productCategory)
    {
        dbContext.ProductCategories.Add(productCategory);
    }

    public async Task<List<ProductCategory>> GetAllAsync()
    {
        return await dbContext.ProductCategories.ToListAsync();
    }

    public async Task SyncAsync(IEnumerable<ProductCategory> categories)
    {
        var dbCategories = await dbContext.ProductCategories.ToListAsync();

        var recordsToDelete = dbCategories.Where(dbCat => categories.All(inputCat => inputCat.Id != dbCat.Id));
        var commonRecords = dbCategories.Except(recordsToDelete).ToArray();
        var recordsToAdd = categories.Where(inputCat => commonRecords.All(dbCat => inputCat.Id != dbCat.Id));

        dbContext.ProductCategories.RemoveRange(recordsToDelete);
        dbContext.ProductCategories.AddRange(recordsToAdd);
        foreach (var dbCat in commonRecords)
        {
            var inputCat = categories.First(c => c.Id == dbCat.Id);
            dbCat.Update(inputCat.Name, inputCat.Order, inputCat.IconName);
        }
    }
}
