using MUS.Entities.DTO;
using MUS.Model;

namespace MUS.Services.Interface
{
    public interface IThuVienServices
    {
        Task<ResultModel> AddThuVien(ThuVienModal modal);

        Task<ResultModel> AddThuVienBaiNahc(ThuVienBaiNhacModal modal);

        Task<List<ThuVienDTO>> GetAllThuVien();
        Task<ThuVienDTO> GetThuVienByUserId(Guid UserId);
        Task<List<ThuVienBaiNhacDTO>> GetThuVienBaiNhacByThuVienId(Guid Id);

        Task<ResultModel> DeleteThuVienBaiNhac(Guid ThuVienId, Guid BaiNhacId);
    }
}
