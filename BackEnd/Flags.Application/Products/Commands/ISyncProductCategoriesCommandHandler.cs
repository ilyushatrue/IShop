namespace Flags.Application.Products.Commands;
public interface ISyncProductCategoriesCommandHandler
{
    Task<bool> Handle(SyncProductCategoriesCommand command, CancellationToken cancellationToken);
}
