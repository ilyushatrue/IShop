using System.Text.Json.Serialization;

namespace IShop.Contracts.Products;

public class ProductCategoryDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Title { get; set; } = null!;
    public int Order { get; set; }
    public int? ParentId { get; set; }
    public string? IconName { get; set; }
    public IEnumerable<ProductCategoryDto> Children { get; set; } = null!;
}