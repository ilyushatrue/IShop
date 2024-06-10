using ErrorOr;
using MediatR;
using Flags.Application.AppSettings;
using Flags.Application.Common.Interfaces.Persistance;
using Microsoft.Extensions.Options;

namespace Flags.Application.Images.Commands;

public class CreateImageCommandHandler(
    IOptions<FileSettings> fileSettings,
    IMediaRepository mediaRepository) : IRequestHandler<CreateImageCommand, ErrorOr<string>>
{
    private readonly string _uploadPath = fileSettings.Value.UploadPath;
    public async Task<ErrorOr<string>> Handle(CreateImageCommand request, CancellationToken cancellationToken)
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
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
        await mediaRepository.CreateAsync(imageId, newFileName, extension, (int)file.Length);

        return newFileName;
    }
}
