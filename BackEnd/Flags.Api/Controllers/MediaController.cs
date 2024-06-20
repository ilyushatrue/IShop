using Flags.Application.Common.Interfaces.Services.Images;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;

namespace Flags.Api.Controllers;

[Route("media")]
public class MediaController(
    IMapper mapper,
    ICreateImageCommandHandler createImageCommand,
    IGetImageByIdQueryHandler getImageByIdQuery) : ApiController
{
    [HttpPost("image")]
    public async Task<IActionResult> CreateImage([FromForm] IFormFile file, CancellationToken cancellationToken)
    {
        var result = await createImageCommand.Handle(new(file), cancellationToken);

        return result.Match(response => Ok(result), Problem);
    }

    [HttpGet("image/{id}")]
    public async Task<IActionResult> GetImageById(Guid id, CancellationToken cancellationToken)
    {
        var result = await getImageByIdQuery.Handle(new(id), cancellationToken);

        if (result.IsError)
        {
            return Problem(result.Errors.First().Description);
        }

        var (fileName, bytes) = result.Value;
        var memoryStream = new MemoryStream(bytes)
        {
            Position = 0
        };

        var fileResult = File(memoryStream, "application/octet-stream", fileName);
        fileResult.EnableRangeProcessing = true;

        return fileResult;
    }
}
