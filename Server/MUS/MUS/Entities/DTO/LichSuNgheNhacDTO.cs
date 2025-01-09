namespace MUS.Entities.DTO
{
    public class LichSuNgheNhacDTO
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public Guid BaiNhacId { get; set; }

        public Guid TheLoaiId { get; set; }

        public DateTime NgayNghe { get; set; }

        public BaiNhacDTO? BaiNhac { get; set; }

    }
}
