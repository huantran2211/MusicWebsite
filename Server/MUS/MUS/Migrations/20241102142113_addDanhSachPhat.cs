using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MUS.Migrations
{
    /// <inheritdoc />
    public partial class addDanhSachPhat : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DanhSachPhat",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenDanhSachPhat = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    NgayPhatHanh = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DanhSachPhat", x => x.Id);
                    table.ForeignKey(
                        name: "FK_User_DanhSachPhat",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "DanhSachPhat_BaiNhac",
                columns: table => new
                {
                    DanhSachPhatId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BaiNhacId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DanhSachPhat_BaiNhac", x => new { x.DanhSachPhatId, x.BaiNhacId });
                    table.ForeignKey(
                        name: "FK_DanhSachPhat_BaiNhac_BaiNhac_BaiNhacId",
                        column: x => x.BaiNhacId,
                        principalTable: "BaiNhac",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DanhSachPhat_BaiNhac_DanhSachPhat_DanhSachPhatId",
                        column: x => x.DanhSachPhatId,
                        principalTable: "DanhSachPhat",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DanhSachPhat_UserId",
                table: "DanhSachPhat",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_DanhSachPhat_BaiNhac_BaiNhacId",
                table: "DanhSachPhat_BaiNhac",
                column: "BaiNhacId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DanhSachPhat_BaiNhac");

            migrationBuilder.DropTable(
                name: "DanhSachPhat");
        }
    }
}
