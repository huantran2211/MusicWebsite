namespace MUS.Model
{
    public class BaiNhacModel
    {
        public Guid Id { get; set; }
        public string? TenBaiNhac { get; set; }
        public DateTime? NgayPhatHanh { get; set; }
        public string? ThoiLuong { get; set; }
        public int? LuotNghe { get; set; } = 0;
        public IFormFile? DuongDanHinhAnh { get; set; }
        public IFormFile? DuongDanBanner { get; set; }
        public IFormFile? DuongDanFileAmNhac { get; set; }
        public string? LoiBaiHat { get; set; }
        public int QuocGiaId { get; set; }
        public Guid? NhacSiId { get; set; } 
        public Guid? TheLoaiId { get; set; } 
        public Guid? TamTrangId { get; set; }
        public Guid? ChudeId { get; set; } 
        public Guid? AlbumId { get; set; }
    }
}
