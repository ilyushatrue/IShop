using IShop.Domain.Common.Exceptions;
using IShop.Application.AppSettings;
using IShop.Application.Images.Queries;
using IShop.Application.Persistance.Repositories;
using Microsoft.Extensions.Options;
using System.Drawing;

namespace IShop.Infrastructure.Services.Images;

public class GetImageByIdQueryHandler(
    IOptions<FileSettings> fileSettings,
    IMediaRepository mediaRepository) : IGetImageByIdQueryHandler
{
    public async Task<(string, byte[])> Handle(GetImageByIdQuery request, CancellationToken cancellationToken)
    {
        var folderPath = fileSettings.Value.UploadPath;
        var image = await mediaRepository.GetByIdAsync(request.Id) ??
            throw new NotFoundException(
                "get-image-by-id",
                $"Изообраажеенииее с id={request.Id} нее наайдееноо.");

        var fullPath = Path.Combine(folderPath, image.Uri);

        try
        {
            using var fileStream = new FileStream(fullPath, FileMode.Open, FileAccess.Read);
            using var originalImage = Image.FromStream(fileStream);

            fileStream.Position = 0;
            var memory = new MemoryStream();
            await fileStream.CopyToAsync(memory, cancellationToken);
            memory.Position = 0;

            return (image.Id.ToString(), memory.ToArray());
        }
        catch (Exception)
        {
            throw;
        }
    }
}