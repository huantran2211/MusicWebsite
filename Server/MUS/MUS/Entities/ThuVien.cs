namespace MUS.Entities
{
    public class ThuVien
    {
        public Guid Id { get; set; }
        public Guid NguoiDungId { get; set; }

        public virtual User? User { get; set; }

        public virtual ICollection<ThuVienBaiNhac> ThuVienBaiNhacs { get; set; } = new List<ThuVienBaiNhac>();

    }
}
