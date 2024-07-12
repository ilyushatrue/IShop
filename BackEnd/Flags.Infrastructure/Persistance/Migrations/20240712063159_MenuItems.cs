using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Flags.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class MenuItems : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "menu_items",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "TEXT", nullable: false),
                    name = table.Column<string>(type: "TEXT", nullable: false),
                    title = table.Column<string>(type: "TEXT", nullable: false),
                    url = table.Column<string>(type: "TEXT", nullable: false),
                    order = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_menu_items", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "role_menu_items",
                columns: table => new
                {
                    menu_item_id = table.Column<Guid>(type: "TEXT", nullable: false),
                    role_id = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_role_menu_items", x => new { x.role_id, x.menu_item_id });
                    table.ForeignKey(
                        name: "fk_role_menu_items_menu_items_menu_item_id",
                        column: x => x.menu_item_id,
                        principalTable: "menu_items",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_role_menu_items_roles_role_id",
                        column: x => x.role_id,
                        principalTable: "roles",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

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

            migrationBuilder.CreateIndex(
                name: "ix_role_menu_items_menu_item_id",
                table: "role_menu_items",
                column: "menu_item_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "role_menu_items");

            migrationBuilder.DropTable(
                name: "menu_items");
        }
    }
}
