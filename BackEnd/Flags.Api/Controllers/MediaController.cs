using Flags.Application.Images.Commands;
using Flags.Application.Images.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Flags.Api.Controllers;

[Route("media")]
public class MediaController(
    ICreateImageCommandHandler createImageCommand,
    IGetImageByIdQueryHandler getImageByIdQuery) : ApiController
{
    [HttpPost("image")]
    public async Task<IActionResult> CreateImage([FromForm] IFormFile file, CancellationToken cancellationToken)
    {
        var result = await createImageCommand.Handle(new(file), cancellationToken);
        return Ok(result);
    }

    [AllowAnonymous]
    [HttpGet("image/{id}")]
    public async Task<IActionResult> GetImageById(Guid id, CancellationToken cancellationToken)
    {
        var result = await getImageByIdQuery
            .Handle(new(id), cancellationToken);


        var (fileName, bytes) = result;
        var memoryStream = new MemoryStream(bytes)
        {
            Position = 0
        };

        var fileResult = File(memoryStream, "application/octet-stream", fileName);
        fileResult.EnableRangeProcessing = true;

        return fileResult;
    }
}
