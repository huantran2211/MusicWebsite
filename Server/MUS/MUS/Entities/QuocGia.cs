namespace MUS.Entities
{
    public class QuocGia
    {
        public int Id { get; set; } 
        public string? TenQuocGia { get; set; }
        public virtual ICollection<BaiNhac> BaiNhacs { get; set; } = new List<BaiNhac>();
    }
}
