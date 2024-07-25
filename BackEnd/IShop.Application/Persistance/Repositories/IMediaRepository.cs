using IShop.Domain.MediaEntity;

namespace IShop.Application.Persistance.Repositories;
public interface IMediaRepository
{
    Task<Media?> GetByIdAsync(Guid id);
    Task<int> UpdateAsync(Media token);
    Task<int> CreateAsync(Guid fileName, string uri, string extension, int fileSize);
    Task<int> DeleteAsync(Media token);
}
