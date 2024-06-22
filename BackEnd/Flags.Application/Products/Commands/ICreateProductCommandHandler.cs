using ErrorOr;

namespace Flags.Application.Products.Commands;
public interface ICreateProductCommandHandler
{
    Task<ErrorOr<bool>> Handle(CreateProductCommand command, CancellationToken cancellationToken);
}
