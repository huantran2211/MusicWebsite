namespace MUS.Model
{
    public class AlbumModal
    {
        public Guid Id { get; set; }
        public string? TenAlbum { get; set; }
        public DateTime? NgayPhatHanh { get; set; }
        public IFormFile? Url { get; set; }
    }
}
