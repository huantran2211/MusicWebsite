namespace MUS.Entities
{
    public class BaiNhac
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
        public Guid? TamTrangId {  get; set; }
        public Guid? ChudeId {  get; set; }
        public Guid? AlbumId { get; set; }
        public int? QuocGiaId { get; set; }
        public virtual Album? Album { get; set; }
        public virtual NhacSi? NhacSi { get; set; } 
        public virtual TheLoai? TheLoai { get; set; }
        public virtual ChuDe? ChuDe { get; set; }
        public virtual TamTrang? TamTrang { get; set; }
        public virtual QuocGia? QuocGia { get; set;}
        public virtual ICollection<DanhSachPhat_BaiNhac> DanhSachPhat_BaiNhacs { get; set; } = new List<DanhSachPhat_BaiNhac>();

        public virtual ICollection<LichSuNgheNhac> LichSuNgheNhacs { get; set; } = new List<LichSuNgheNhac>();

        public virtual ICollection<ThuVienBaiNhac> ThuVienBaiNhacs { get; set; } = new List<ThuVienBaiNhac>();
    }
}
