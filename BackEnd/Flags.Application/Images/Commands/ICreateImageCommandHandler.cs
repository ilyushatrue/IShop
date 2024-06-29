namespace Flags.Application.Images.Commands;
public interface ICreateImageCommandHandler
{
    Task<string> Handle(CreateImageCommand request, CancellationToken cancellationToken);
}
