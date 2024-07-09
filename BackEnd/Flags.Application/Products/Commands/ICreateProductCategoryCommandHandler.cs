namespace Flags.Application.Products.Commands;
public interface ICreateProductCategoryCommandHandler
{
    Task<bool> Handle(CreateProductCategoryCommand command);
}
