namespace MUS.Entities.DTO
{
    public class DanhSachPhatBaiNhacDTO
    {
        public Guid DanhSachPhatId { get; set; }

        public Guid BaiNhacId { get; set; }

        public BaiNhacDTO? BaiNhac { get; set; }
    }
}
