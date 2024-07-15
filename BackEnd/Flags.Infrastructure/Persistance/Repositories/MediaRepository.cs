using Flags.Application.Persistance.Repositories;
using Flags.Domain.MediaEntity;
using Microsoft.EntityFrameworkCore;

namespace Flags.Infrastructure.Persistance.Repositories;
public class MediaRepository(
    AppDbContext dbContext) : IMediaRepository
{
    public async Task<int> CreateAsync(Guid fileName, string uri, string extension, int fileSize)
    {
        var image = Media.Create(fileName, uri, extension, fileSize);
        dbContext.Media.Add(image);
        return await dbContext.SaveChangesAsync();
    }

    public Task<int> DeleteAsync(Media image)
    {
        dbContext.Media.Remove(image);
        return dbContext.SaveChangesAsync();
    }

    public async Task<Media?> GetByIdAsync(Guid id)
    {
        return await dbContext.Media.Where(m => m.Id == id).SingleOrDefaultAsync();
    }

    public Task<int> UpdateAsync(Media image)
    {
        dbContext.Media.Update(image);
        return dbContext.SaveChangesAsync();
    }
}
