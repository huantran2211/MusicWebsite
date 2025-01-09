using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MUS.Migrations
{
    /// <inheritdoc />
    public partial class AddThuVien : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ThuVien",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NguoiDungId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ThuVien", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ThuVien_User_NguoiDungId",
                        column: x => x.NguoiDungId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ThuVienBaiNhacs",
                columns: table => new
                {
                    ThuVienId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BaiNhacId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ThuVienBaiNhacs", x => new { x.ThuVienId, x.BaiNhacId });
                    table.ForeignKey(
                        name: "FK_ThuVienBaiNhacs_BaiNhac_BaiNhacId",
                        column: x => x.BaiNhacId,
                        principalTable: "BaiNhac",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ThuVienBaiNhacs_ThuVien_ThuVienId",
                        column: x => x.ThuVienId,
                        principalTable: "ThuVien",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ThuVien_NguoiDungId",
                table: "ThuVien",
                column: "NguoiDungId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ThuVienBaiNhacs_BaiNhacId",
                table: "ThuVienBaiNhacs",
                column: "BaiNhacId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ThuVienBaiNhacs");

            migrationBuilder.DropTable(
                name: "ThuVien");
        }
    }
}
