namespace MUS.Entities
{
    public class DanhSachPhat
    {
        public Guid Id { get; set; }

        public string? TenDanhSachPhat { get; set; }

        public Guid? UserId { get; set; }

        public DateTime NgayPhatHanh { get; set; }

        public virtual User? User { get; set; }

        public virtual ICollection<DanhSachPhat_BaiNhac> DanhSachPhat_BaiNhacs { get; set; } = new List<DanhSachPhat_BaiNhac>();
    }
}
