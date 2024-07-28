using Microsoft.AspNetCore.Http;

namespace IShop.Application.Images.Commands;
public record CreateImageCommand(
    IFormFile File
    );
