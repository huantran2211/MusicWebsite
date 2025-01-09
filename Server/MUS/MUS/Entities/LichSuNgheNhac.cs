namespace MUS.Entities
{
    public class LichSuNgheNhac
    {
        public Guid Id { get; set; }

        public Guid? UserId { get; set; }

        public Guid? TheLoaiId { get; set; }

        public Guid? BaiNhacId {  get; set; }

        public DateTime NgayNghe {  get; set; }

        public User? User { get; set; }

        public BaiNhac? BaiNhac { get; set; }
    }
}
