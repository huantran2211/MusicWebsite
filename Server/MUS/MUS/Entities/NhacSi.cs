namespace MUS.Entities
{
    public class NhacSi
    {
        public Guid Id { get; set; }
        public string? TenNhacSi { get; set; }
        public string? NickName { get; set; }
        public string? Url { get; set; }
        public virtual ICollection<BaiNhac> BaiNhacs { get; set; } = new List<BaiNhac>();
        public virtual ICollection<AlbumNhacSi>? AlbumNhacSis { get; set; } = new List<AlbumNhacSi>();
    }
}
