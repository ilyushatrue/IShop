using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Flags.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UserUniqueEmailPhone : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "ix_user_email",
                table: "users",
                column: "email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_user_phone",
                table: "users",
                column: "phone",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ix_user_email",
                table: "users");

            migrationBuilder.DropIndex(
                name: "ix_user_phone",
                table: "users");
        }
    }
}
