namespace MUS.Model
{
    public class NhacsiModel
    {
        public Guid? Id { get; set; }
        public string? TenNhacSi { get; set; }
        public string? NickName { get; set; }
        public IFormFile? Url { get; set; }
    }
}
