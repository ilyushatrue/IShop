namespace Flags.Application.Products.Commands;
public interface ICreateProductCommandHandler
{
    Task<bool> Handle(CreateProductCommand command, CancellationToken cancellationToken);
}
