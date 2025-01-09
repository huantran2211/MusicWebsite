namespace MUS.Entities
{
    public class AlbumNhacSi
    {
        public Guid? AlBumId { get; set; }

        public Guid? NhacSiId { get; set; }

        public virtual Album? Album { get; set; } 

        public virtual NhacSi? NhacSi { get; set; }
    }
}
