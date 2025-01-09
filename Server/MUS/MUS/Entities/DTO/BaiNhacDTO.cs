namespace MUS.Entities.DTO
{
    public class BaiNhacDTO
    {
        public Guid Id { get; set; }
        public string? TenBaiNhac { get; set; }
        public DateTime? NgayPhatHanh { get; set; }
        public string? ThoiLuong { get; set; }
        public int? LuotNghe { get; set; }
        public string? DuongDanHinhAnh { get; set; }
        public string? DuongDanBanner { get; set; }
        public string? DuongDanFileAmNhac { get; set; }
        public decimal? KichThuoc { get; set; }
        public string? TenFile { get; set; }
        public string? LoiBaiHat { get; set; }
        public Guid? NhacSiId { get; set; }
        public Guid? TheLoaiId { get; set; }
        public Guid? TamTrangId { get; set; }
        public Guid? ChudeId { get; set; }
        public Guid? AlbumId { get; set; }
        public NhacSiDTO? NhacSi { get; set; }
        public AlbumDTO?  Album { get; set; }
        public TheLoaiDTO? TheLoai { get; set; }
    }
}
