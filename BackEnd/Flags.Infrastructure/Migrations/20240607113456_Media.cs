using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Flags.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Media : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "avatar_id",
                table: "users",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "media",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "TEXT", nullable: false),
                    file_size = table.Column<int>(type: "INTEGER", nullable: false),
                    extension = table.Column<string>(type: "TEXT", nullable: false),
                    uri = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_media", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "ix_users_avatar_id",
                table: "users",
                column: "avatar_id",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "fk_users_media_avatar_id",
                table: "users",
                column: "avatar_id",
                principalTable: "media",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_users_media_avatar_id",
                table: "users");

            migrationBuilder.DropTable(
                name: "media");

            migrationBuilder.DropIndex(
                name: "ix_users_avatar_id",
                table: "users");

            migrationBuilder.DropColumn(
                name: "avatar_id",
                table: "users");
        }
    }
}
