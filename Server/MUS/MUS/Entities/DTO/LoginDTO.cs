namespace MUS.Entities.DTO
{
    public class LoginDTO
    {
        public Guid Id { get; set; }
        public string? TenNguoiDung { get; set; }

        public string? SoDienThoai { get; set; }

        public string? Email { get; set; }
        public string? Token { get; set; }

        public int? Status { get; set; }
        public Guid? RoleId { get; set; }
    }
}
