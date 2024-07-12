using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Flags.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class MenuItems2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "menu_items",
                keyColumn: "id",
                keyValue: new Guid("328332a3-9355-4968-bc12-de34950dd631"));

            migrationBuilder.DeleteData(
                table: "menu_items",
                keyColumn: "id",
                keyValue: new Guid("5cb5a119-2f15-4552-bef2-f4730f800530"));

            migrationBuilder.DeleteData(
                table: "menu_items",
                keyColumn: "id",
                keyValue: new Guid("6e510858-a487-4748-a51c-9eeaae564610"));

            migrationBuilder.DeleteData(
                table: "menu_items",
                keyColumn: "id",
                keyValue: new Guid("88c2abeb-9dc0-41f9-9220-32e7e7255533"));

            migrationBuilder.DeleteData(
                table: "menu_items",
                keyColumn: "id",
                keyValue: new Guid("96349595-7f01-4a93-8a23-a3cc58a09b79"));

            migrationBuilder.DeleteData(
                table: "menu_items",
                keyColumn: "id",
                keyValue: new Guid("af016874-f93a-4ce5-8720-c4a17ab0fe1f"));

            migrationBuilder.AddColumn<string>(
                name: "icon_name",
                table: "menu_items",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "menu_items",
                columns: new[] { "id", "icon_name", "name", "order", "title", "url" },
                values: new object[,]
                {
                    { new Guid("2d35805b-97b0-4695-872d-ac2e18561d54"), "sell", "purchases", 2, "Покупки", "/purchases" },
                    { new Guid("3dd3e83f-46c2-43ed-8523-ba4c4d7ba761"), "settings", "settings", 6, "Настройки", "/settings" },
                    { new Guid("4a33a997-a77a-4224-b73c-373ad3a608f1"), "shopping_bag", "cart", 3, "Корзина", "/cart" },
                    { new Guid("9a2793dc-bd0b-45ca-a879-4f4ab65a3da6"), "person", "account", 1, "Мой профиль", "/account" },
                    { new Guid("af76877e-b592-41c1-be1c-25bbb05fbca3"), "inventory", "products", 4, "Товары", "/products" },
                    { new Guid("cc7c483d-ab7d-426a-8b78-bebde0f43155"), "people", "users", 5, "Пользователи", "/users" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "menu_items",
                keyColumn: "id",
                keyValue: new Guid("2d35805b-97b0-4695-872d-ac2e18561d54"));

            migrationBuilder.DeleteData(
                table: "menu_items",
                keyColumn: "id",
                keyValue: new Guid("3dd3e83f-46c2-43ed-8523-ba4c4d7ba761"));

            migrationBuilder.DeleteData(
                table: "menu_items",
                keyColumn: "id",
                keyValue: new Guid("4a33a997-a77a-4224-b73c-373ad3a608f1"));

            migrationBuilder.DeleteData(
                table: "menu_items",
                keyColumn: "id",
                keyValue: new Guid("9a2793dc-bd0b-45ca-a879-4f4ab65a3da6"));

            migrationBuilder.DeleteData(
                table: "menu_items",
                keyColumn: "id",
                keyValue: new Guid("af76877e-b592-41c1-be1c-25bbb05fbca3"));

            migrationBuilder.DeleteData(
                table: "menu_items",
                keyColumn: "id",
                keyValue: new Guid("cc7c483d-ab7d-426a-8b78-bebde0f43155"));

            migrationBuilder.DropColumn(
                name: "icon_name",
                table: "menu_items");

            migrationBuilder.InsertData(
                table: "menu_items",
                columns: new[] { "id", "name", "order", "title", "url" },
                values: new object[,]
                {
                    { new Guid("328332a3-9355-4968-bc12-de34950dd631"), "settings", 6, "Настройки", "/settings" },
                    { new Guid("5cb5a119-2f15-4552-bef2-f4730f800530"), "users", 5, "Пользователи", "/users" },
                    { new Guid("6e510858-a487-4748-a51c-9eeaae564610"), "purchases", 2, "Покупки", "/purchases" },
                    { new Guid("88c2abeb-9dc0-41f9-9220-32e7e7255533"), "cart", 3, "Корзина", "/cart" },
                    { new Guid("96349595-7f01-4a93-8a23-a3cc58a09b79"), "products", 4, "Товары", "/products" },
                    { new Guid("af016874-f93a-4ce5-8720-c4a17ab0fe1f"), "account", 1, "Мой профиль", "/account" }
                });
        }
    }
}
