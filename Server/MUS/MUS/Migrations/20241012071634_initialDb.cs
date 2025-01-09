using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MUS.Migrations
{
    /// <inheritdoc />
    public partial class initialDb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Album",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenAlbum = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    NgayPhatHanh = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Album", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ChuDe",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenChuDe = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Url = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChuDe", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "NhacSi",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenNhacSi = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    NickName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Url = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NhacSi", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TamTrang",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenTamTrang = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Url = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TamTrang", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TheLoai",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenTheLoai = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Url = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TheLoai", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AlbumNhacSis",
                columns: table => new
                {
                    AlBumId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NhacSiId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AlbumNhacSis", x => new { x.NhacSiId, x.AlBumId });
                    table.ForeignKey(
                        name: "FK_AlbumNhacSis_Album_AlBumId",
                        column: x => x.AlBumId,
                        principalTable: "Album",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AlbumNhacSis_NhacSi_NhacSiId",
                        column: x => x.NhacSiId,
                        principalTable: "NhacSi",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BaiNhac",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenBaiNhac = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    NgayPhatHanh = table.Column<DateTime>(type: "datetime", nullable: true),
                    ThoiLuong = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    LuotNghe = table.Column<decimal>(type: "decimal(18,0)", nullable: false),
                    DuongDanHinhAnh = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    DuongDanFileAmNhac = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    LoiBaiHat = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    NhacSiId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TheLoaiId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TamTrangId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ChudeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AlbumId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BaiNhac", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Album_BaiNhac",
                        column: x => x.AlbumId,
                        principalTable: "Album",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ChuDe_BaiNhac",
                        column: x => x.ChudeId,
                        principalTable: "ChuDe",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_NhacSi_BaiNhac",
                        column: x => x.NhacSiId,
                        principalTable: "NhacSi",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TamTrang_BaiNhac",
                        column: x => x.TamTrangId,
                        principalTable: "TamTrang",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TheLoai_BaiNhac",
                        column: x => x.TheLoaiId,
                        principalTable: "TheLoai",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_AlbumNhacSis_AlBumId",
                table: "AlbumNhacSis",
                column: "AlBumId");

            migrationBuilder.CreateIndex(
                name: "IX_BaiNhac_AlbumId",
                table: "BaiNhac",
                column: "AlbumId");

            migrationBuilder.CreateIndex(
                name: "IX_BaiNhac_ChudeId",
                table: "BaiNhac",
                column: "ChudeId");

            migrationBuilder.CreateIndex(
                name: "IX_BaiNhac_NhacSiId",
                table: "BaiNhac",
                column: "NhacSiId");

            migrationBuilder.CreateIndex(
                name: "IX_BaiNhac_TamTrangId",
                table: "BaiNhac",
                column: "TamTrangId");

            migrationBuilder.CreateIndex(
                name: "IX_BaiNhac_TheLoaiId",
                table: "BaiNhac",
                column: "TheLoaiId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AlbumNhacSis");

            migrationBuilder.DropTable(
                name: "BaiNhac");

            migrationBuilder.DropTable(
                name: "Album");

            migrationBuilder.DropTable(
                name: "ChuDe");

            migrationBuilder.DropTable(
                name: "NhacSi");

            migrationBuilder.DropTable(
                name: "TamTrang");

            migrationBuilder.DropTable(
                name: "TheLoai");
        }
    }
}
