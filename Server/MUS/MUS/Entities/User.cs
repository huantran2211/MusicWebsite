namespace MUS.Entities
{
    public class User
    {
        public Guid Id { get; set; }

        public string? TenNguoiDung { get; set; }

        public string? SoDienThoai { get; set; }

        public string? Email { get; set; }

        public string? Password { get; set; }

        public Guid? RoleId { get; set; }

         public virtual Role? Role { get; set; }

        public virtual ThuVien? ThuVien { get; set; }

        public virtual ICollection<DanhSachPhat> DanhSachPhats { get; set; } = new List<DanhSachPhat>();

        public virtual ICollection<LichSuNgheNhac> LichSuNgheNhacs { get; set; } = new List<LichSuNgheNhac>();
    }
}
