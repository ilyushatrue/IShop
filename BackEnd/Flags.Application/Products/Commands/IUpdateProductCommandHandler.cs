using ErrorOr;
using Flags.Domain.ProductRoot;

namespace Flags.Application.Products.Commands;
public interface IUpdateProductCommandHandler
{
    Task<ErrorOr<bool>> Handle(Product product, CancellationToken cancellationToken);
}
