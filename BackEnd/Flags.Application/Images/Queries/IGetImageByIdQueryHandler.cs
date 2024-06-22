using ErrorOr;

namespace Flags.Application.Images.Queries;
public interface IGetImageByIdQueryHandler
{
    Task<ErrorOr<(string, byte[])>> Handle(GetImageByIdQuery request, CancellationToken cancellationToken);
}
