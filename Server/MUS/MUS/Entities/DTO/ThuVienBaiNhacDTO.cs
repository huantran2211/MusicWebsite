namespace MUS.Entities.DTO
{
    public class ThuVienBaiNhacDTO
    {
        public Guid ThuVienId { get; set; }

        public Guid BaiNhacId { get; set; }

        public BaiNhacDTO? BaiNhac { get; set; }
    }
}
