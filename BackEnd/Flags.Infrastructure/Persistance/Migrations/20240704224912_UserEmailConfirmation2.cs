using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Flags.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UserEmailConfirmation2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "email_is_verified",
                table: "users");

            migrationBuilder.AddColumn<bool>(
                name: "is_confirmed",
                table: "user_email_confirmations",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "is_confirmed",
                table: "user_email_confirmations");

            migrationBuilder.AddColumn<bool>(
                name: "email_is_verified",
                table: "users",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }
    }
}
