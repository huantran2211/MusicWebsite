using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MUS.Migrations
{
    /// <inheritdoc />
    public partial class AddHistory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LichSuNgheNhacs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    TheLoaiId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    BaiNhacId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    NgayNghe = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LichSuNgheNhacs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LichSuNgheNhacs_BaiNhac_BaiNhacId",
                        column: x => x.BaiNhacId,
                        principalTable: "BaiNhac",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_LichSuNgheNhacs_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_LichSuNgheNhacs_BaiNhacId",
                table: "LichSuNgheNhacs",
                column: "BaiNhacId");

            migrationBuilder.CreateIndex(
                name: "IX_LichSuNgheNhacs_UserId",
                table: "LichSuNgheNhacs",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LichSuNgheNhacs");
        }
    }
}
