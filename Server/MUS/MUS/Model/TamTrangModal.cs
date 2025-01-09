namespace MUS.Model
{
    public class TamTrangModal
    {
        public Guid Id { get; set; }
        public string? TenTamTrang { get; set; }
        public IFormFile? Url { get; set; }
    }
}
