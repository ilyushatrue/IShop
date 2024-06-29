using Flags.Domain.ProductRoot;

namespace Flags.Application.Products.Commands;
public interface IUpdateProductCommandHandler
{
    Task<bool> Handle(Product product, CancellationToken cancellationToken);
}
