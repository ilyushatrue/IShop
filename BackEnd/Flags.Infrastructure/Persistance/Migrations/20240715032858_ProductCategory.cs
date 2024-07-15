using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Flags.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ProductCategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "parent_id",
                table: "product_categories",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "title",
                table: "product_categories",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "ix_product_categories_parent_id",
                table: "product_categories",
                column: "parent_id");

            migrationBuilder.AddForeignKey(
                name: "fk_product_categories_product_categories_parent_id",
                table: "product_categories",
                column: "parent_id",
                principalTable: "product_categories",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_product_categories_product_categories_parent_id",
                table: "product_categories");

            migrationBuilder.DropIndex(
                name: "ix_product_categories_parent_id",
                table: "product_categories");

            migrationBuilder.DropColumn(
                name: "parent_id",
                table: "product_categories");

            migrationBuilder.DropColumn(
                name: "title",
                table: "product_categories");
        }
    }
}
