using ErrorOr;
using Flags.Application.Images.Commands;

namespace Flags.Application.Common.Interfaces.Services.Images;
public interface ICreateImageCommandHandler
{
    Task<ErrorOr<string>> Handle(CreateImageCommand request, CancellationToken cancellationToken);
}
