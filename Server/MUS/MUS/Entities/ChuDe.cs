namespace MUS.Entities
{
    public class ChuDe
    {
       public Guid Id { get; set; }
       public string? TenChuDe { get; set; }
       public string? Url {  get; set; }
       public virtual ICollection<BaiNhac> BaiNhacs { get; set; } = new List<BaiNhac>();
    }
}
