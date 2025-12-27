using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class FixCompanyIconCascadeRules : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Company_Icons_Icons_CompanyId",
                table: "Company_Icons");

            migrationBuilder.DropForeignKey(
                name: "FK_Company_Icons_Users_UserId",
                table: "Company_Icons");

            migrationBuilder.DropIndex(
                name: "IX_Company_Icons_UserId",
                table: "Company_Icons");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Company_Icons");

            migrationBuilder.CreateIndex(
                name: "IX_Company_Icons_AuthorId",
                table: "Company_Icons",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_Company_Icons_IconId",
                table: "Company_Icons",
                column: "IconId");

            migrationBuilder.AddForeignKey(
                name: "FK_Company_Icons_Icons_IconId",
                table: "Company_Icons",
                column: "IconId",
                principalTable: "Icons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Company_Icons_Users_AuthorId",
                table: "Company_Icons",
                column: "AuthorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Company_Icons_Icons_IconId",
                table: "Company_Icons");

            migrationBuilder.DropForeignKey(
                name: "FK_Company_Icons_Users_AuthorId",
                table: "Company_Icons");

            migrationBuilder.DropIndex(
                name: "IX_Company_Icons_AuthorId",
                table: "Company_Icons");

            migrationBuilder.DropIndex(
                name: "IX_Company_Icons_IconId",
                table: "Company_Icons");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Company_Icons",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Company_Icons_UserId",
                table: "Company_Icons",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Company_Icons_Icons_CompanyId",
                table: "Company_Icons",
                column: "CompanyId",
                principalTable: "Icons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Company_Icons_Users_UserId",
                table: "Company_Icons",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
