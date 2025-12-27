using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class RevisedCompanyIconsModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Company_Icons_Users_AuthorId",
                table: "Company_Icons");

            migrationBuilder.RenameColumn(
                name: "AuthorId",
                table: "Company_Icons",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Company_Icons_AuthorId",
                table: "Company_Icons",
                newName: "IX_Company_Icons_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Company_Icons_Users_UserId",
                table: "Company_Icons",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Company_Icons_Users_UserId",
                table: "Company_Icons");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Company_Icons",
                newName: "AuthorId");

            migrationBuilder.RenameIndex(
                name: "IX_Company_Icons_UserId",
                table: "Company_Icons",
                newName: "IX_Company_Icons_AuthorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Company_Icons_Users_AuthorId",
                table: "Company_Icons",
                column: "AuthorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
