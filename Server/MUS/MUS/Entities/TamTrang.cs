namespace MUS.Entities
{
    public class TamTrang
    {
        public Guid Id { get; set; }
        public string? TenTamTrang { get; set; }
        public string? Url { get; set; }
        public virtual ICollection<BaiNhac> BaiNhacs { get; set; } = new List<BaiNhac>();
    }
}
