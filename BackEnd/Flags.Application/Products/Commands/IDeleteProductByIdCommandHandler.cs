using ErrorOr;

namespace Flags.Application.Products.Commands;
public interface IDeleteProductByIdCommandHandler
{
    Task<ErrorOr<bool>> Handle(Guid id, CancellationToken cancellationToken);
}
