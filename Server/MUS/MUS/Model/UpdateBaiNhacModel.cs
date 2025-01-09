namespace MUS.Model
{
    public class UpdateBaiNhacModel
    {
        public Guid Id { get; set; }
        public string? TenBaiNhac { get; set; }
        public DateTime? NgayPhatHanh { get; set; } 
        public string? ThoiLuong { get; set; }
        public int? LuotNghe { get; set; } = 0;
        public string? LoiBaiHat { get; set; }
        public Guid? NhacSiId { get; set; } = null;
        public Guid? TheLoaiId { get; set; } = null;
        public Guid? TamTrangId { get; set; } = null;
        public Guid? ChudeId { get; set; } = null;
        public Guid? AlbumId { get; set; } = null;
    }
}
