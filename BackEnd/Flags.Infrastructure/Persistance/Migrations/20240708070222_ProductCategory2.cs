using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Flags.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ProductCategory2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "icon_name",
                table: "product_categories",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "order",
                table: "product_categories",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "icon_name",
                table: "product_categories");

            migrationBuilder.DropColumn(
                name: "order",
                table: "product_categories");
        }
    }
}
