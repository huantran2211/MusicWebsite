namespace MUS.Model
{
    public class LichSuNgheNhacModel
    {
        public Guid Id { get; set; }
        public Guid BaiNhacId { get; set; }

        public Guid UserId { get; set; }

        public Guid TheLoaiId { get; set; }

        public DateTime NgayNghe { get; set; }
    }
}
