namespace MUS.Entities
{
    public class ThuVienBaiNhac
    {
        public Guid ThuVienId { get; set; }


        public Guid BaiNhacId { get; set; }

        public virtual ThuVien? ThuVien { get; set; }

        public virtual BaiNhac? BaiNhac { get; set; }
    }
}
