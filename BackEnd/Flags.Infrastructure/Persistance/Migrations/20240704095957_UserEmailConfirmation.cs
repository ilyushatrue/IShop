using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Flags.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UserEmailConfirmation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "user_email_confirmations",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "TEXT", nullable: false),
                    confirmation_token = table.Column<string>(type: "TEXT", nullable: false),
                    expiry_date_time = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_user_email_confirmations", x => x.id);
                    table.ForeignKey(
                        name: "fk_user_email_confirmations_users_id",
                        column: x => x.id,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "user_email_confirmations");
        }
    }
}
