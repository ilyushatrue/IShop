namespace Flags.Application.Products.Commands;
public interface IUpdateProductCommandHandler
{
    Task<bool> Handle(UpdateProductCommand product, CancellationToken cancellationToken);
}
