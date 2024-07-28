using IShop.Application.AppSettings;
using IShop.Application.Images.Commands;
using IShop.Application.Persistance.Repositories;
using Microsoft.Extensions.Options;

namespace IShop.Infrastructure.Services.Images;

public class CreateImageCommandHandler(
    IOptions<FileSettings> fileSettings,
    IMediaRepository mediaRepository) : ICreateImageCommandHandler
{
    private readonly string _uploadPath = fileSettings.Value.UploadPath;
    public async Task<string> Handle(CreateImageCommand request, CancellationToken cancellationToken)
    {
        var file = request.File;
        var extension = Path.GetExtension(request.File.FileName);
        var imageId = Guid.NewGuid();
        var newFileName = $"{imageId}{extension}";

        Directory.CreateDirectory(_uploadPath);
        var filePath = Path.Combine(_uploadPath, newFileName);

        using (var outputStream = new FileStream(filePath, FileMode.Create))
        {
            try
            {
                await file.CopyToAsync(outputStream, cancellationToken);
            }
            catch (Exception)
            {
                throw;
            }
        }
        await mediaRepository.CreateAsync(imageId, newFileName, extension, (int)file.Length);

        return imageId.ToString();
    }
}
