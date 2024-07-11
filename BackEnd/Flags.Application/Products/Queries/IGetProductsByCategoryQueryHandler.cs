using Flags.Application.Common;
using Flags.Domain.ProductRoot;

namespace Flags.Application.Products.Queries;
public interface IGetProductsByCategoryQueryHandler
{
    Task<Pager<Product>> Handle(GetProductsByCategoryQuery query);
}
