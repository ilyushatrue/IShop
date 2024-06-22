using Flags.Application.Images.Commands;
using Flags.Application.Images.Queries;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
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

    [AllowAnonymous]
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
