using ErrorOr;
using MediatR;

namespace Flags.Application.Images.Queries;

public record GetImageByIdQuery(
    Guid Id) : IRequest<ErrorOr<(string, byte[])>>;
