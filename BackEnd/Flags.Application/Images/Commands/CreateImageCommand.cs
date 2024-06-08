using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Flags.Application.Images.Commands;
public record CreateImageCommand(
    IFormFile File
    ) : IRequest<ErrorOr<string>>;
