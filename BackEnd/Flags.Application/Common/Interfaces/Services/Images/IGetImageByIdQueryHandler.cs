using ErrorOr;
using Flags.Application.Images.Queries;

namespace Flags.Application.Common.Interfaces.Services.Images;
public interface IGetImageByIdQueryHandler
{
    Task<ErrorOr<(string, byte[])>> Handle(GetImageByIdQuery request, CancellationToken cancellationToken);
}
