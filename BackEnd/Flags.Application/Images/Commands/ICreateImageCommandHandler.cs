using ErrorOr;

namespace Flags.Application.Images.Commands;
public interface ICreateImageCommandHandler
{
    Task<ErrorOr<string>> Handle(CreateImageCommand request, CancellationToken cancellationToken);
}
