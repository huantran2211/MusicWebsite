namespace MUS.Entities
{
    public class TheLoai
    {
        public Guid Id { get; set; }
        public string? TenTheLoai { get; set; }
        public string? Url { get; set; }
        public virtual ICollection<BaiNhac> BaiNhacs { get; set; } = new List<BaiNhac>(); 
    }
}
