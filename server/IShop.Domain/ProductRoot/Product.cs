﻿using IShop.Domain.Common.Exceptions;
using IShop.Domain.Common.Models;
using IShop.Domain.MediaEntity;
using IShop.Domain.ProductRoot.Entities;
using IShop.Domain.UserRoot.Entities;

namespace IShop.Domain.ProductRoot;
public class Product : AggregateRoot<Guid>
{
    private Product() : base(new Guid()) { }
    private Product(Guid id) : base(id) { }

    private Product(Guid id, string name, decimal price, Guid imageId, int categoryId, string? description) : this(id)
    {
        Update(name, price, imageId, categoryId, description);
    }
    public static Product Create(Guid id, string name, decimal price, Guid imageId, int categoryId, string? description)
    {
        return new Product(id, name, price, imageId, categoryId, description);
    }

    public void Update(string name, decimal price, Guid imageId, int categoryId, string? description)
    {
        if (price < 0) throw new ValidationException(
            "validation-exception",
            $"Цена {price} не может быть ниже 0.",
            "Цена не может быть ниже 0.");

        Name = name;
        Price = price;
        ImageId = imageId;
        CategoryId = categoryId;
        Description = description;
    }

    public string Name { get; private set; } = null!;
    public string? Description { get; private set; }
    public decimal Price { get; private set; }
    public Guid ImageId { get; private set; }
    public int CategoryId { get; private set; }

    public Media? Image { get; private set; }
    public ProductCategory? Category { get; private set; }
    public ICollection<UserCartProduct>? UserCartProducts { get; set; }
    public ICollection<UserFavoriteProduct>? UserFavoriteProducts { get; set; }
}
