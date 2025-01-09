namespace MUS.Entities
{
    public class Album
    {
        public Guid Id { get; set; }
        public string? TenAlbum { get; set; }
        public DateTime? NgayPhatHanh { get; set; }
        public string? Url { get; set; }
        public ICollection<AlbumNhacSi>? AlbumNhacSis { get; set; } = new List<AlbumNhacSi>();
        public ICollection<BaiNhac>? BaiNhacs { get; set; } = new List<BaiNhac>();

    }
}
