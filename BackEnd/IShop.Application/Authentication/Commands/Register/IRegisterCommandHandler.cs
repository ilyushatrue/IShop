namespace IShop.Application.Authentication.Commands.Register;

public interface IRegisterCommandHandler
{
    Task<bool> Handle(RegisterCommand command, CancellationToken cancellationToken);
}
