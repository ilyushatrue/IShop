namespace Flags.Application.Products.Commands;
public interface IDeleteProductsByIdCommandHandler
{
    Task<bool> Handle(DeleteProductsByIdCommand command, CancellationToken cancellationToken);
}
