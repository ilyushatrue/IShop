using ErrorOr;
using Flags.Application.AppSettings;
using Flags.Application.Common.Interfaces.Persistance;
using Flags.Application.Common.Interfaces.Services.Images;
using Flags.Application.Images.Queries;
using Flags.Domain.Common.Errors;
using Microsoft.Extensions.Options;
using System.Drawing;

namespace Flags.Infrastructure.Services.Images;

public class GetImageByIdQueryHandler(
    IOptions<FileSettings> fileSettings,
    IMediaRepository mediaRepository) : IGetImageByIdQueryHandler
{
    public async Task<ErrorOr<(string, byte[])>> Handle(GetImageByIdQuery request, CancellationToken cancellationToken)
    {
        var folderPath = fileSettings.Value.UploadPath;
        var image = await mediaRepository.GetByIdAsync(request.Id);

        if (image is null)
        {
            return Errors.Media.ImageNotFound;
        }

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
            return Errors.Media.ImageNotFound;
        }
    }
}