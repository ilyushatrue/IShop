using Microsoft.AspNetCore.Http;

namespace Flags.Application.Images.Commands;
public record CreateImageCommand(
    IFormFile File
    );
