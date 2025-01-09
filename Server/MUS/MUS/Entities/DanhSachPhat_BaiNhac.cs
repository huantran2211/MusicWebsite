namespace MUS.Entities
{
    public class DanhSachPhat_BaiNhac
    {
        public Guid DanhSachPhatId { get; set; }

        public Guid BaiNhacId { get; set; }

        public virtual DanhSachPhat? DanhSachPhat { get; set; }
        public virtual BaiNhac? BaiNhac { get; set; }

    }
}
