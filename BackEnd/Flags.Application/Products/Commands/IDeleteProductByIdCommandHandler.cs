namespace Flags.Application.Products.Commands;
public interface IDeleteProductByIdCommandHandler
{
    Task<bool> Handle(Guid id, CancellationToken cancellationToken);
}
