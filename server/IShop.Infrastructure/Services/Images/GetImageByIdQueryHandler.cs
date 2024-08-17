using IShop.Domain.Common.Exceptions;
using IShop.Application.AppSettings;
using IShop.Application.Images.Queries;
using IShop.Application.Persistance.Repositories;
using Microsoft.Extensions.Options;
using SixLabors.ImageSharp;

namespace IShop.Infrastructure.Services.Images;

public class GetImageByIdQueryHandler(
    IOptions<FileSettings> fileSettings,
    IMediaRepository mediaRepository) : IGetImageByIdQueryHandler
{
    private readonly FileSettings _fileSettings = fileSettings.Value;

    public async Task<(string, byte[])> Handle(GetImageByIdQuery request, CancellationToken cancellationToken)
    {
        var folderPath = _fileSettings.UploadPath;
        var image = await mediaRepository.GetByIdAsync(request.Id) ??
            throw new NotFoundException(
                "get-image-by-id",
                $"Изображение с id={request.Id} не найдено.");

        var fullPath = Path.Combine(folderPath, image.Uri);

        try
        {
            using var fileStream = new FileStream(fullPath, FileMode.Open, FileAccess.Read);
            using var originalImage = await Image.LoadAsync(fileStream, cancellationToken);

            using var memory = new MemoryStream();
            await originalImage.SaveAsPngAsync(memory, cancellationToken);
            memory.Position = 0;

            return (image.Id.ToString(), memory.ToArray());
        }
        catch (Exception)
        {
            throw;
        }
    }
}
