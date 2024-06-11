using Flags.Application.Images.Commands;
using Flags.Application.Images.Queries;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Flags.Api.Controllers;

[Route("media")]
public class MediaController(
    ISender mediatr,
    IMapper mapper) : ApiController
{
    [HttpPost("image")]
    public async Task<IActionResult> CreateImage([FromForm] IFormFile file)
    {
        var result = await mediatr.Send(new CreateImageCommand(file));

        return result.Match(response => Ok(result), Problem);
    }

    [HttpGet("image/{id}")]
    public async Task<IActionResult> GetImageById(Guid id)
    {
        var result = await mediatr.Send(new GetImageByIdQuery(id));

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
