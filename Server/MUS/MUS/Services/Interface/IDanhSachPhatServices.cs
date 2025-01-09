using MUS.Entities.DTO;
using MUS.Model;

namespace MUS.Services.Interface
{
    public interface IDanhSachPhatServices
    {
        Task<ResultModel> AddDanhSachPhat(danhSachPhatModal modal);

        Task<List<DanhSachPhatDTO>> GetAllDanhSachPhat();

        Task<DanhSachPhatDTO> GetDanhSachPhatById(Guid id);

        Task<ResultModel> DeleteDanhSachPhat(Guid id);

        Task<ResultModel> UpdateDanhSachPhat(danhSachPhatModal id);

        Task<List<DanhSachPhatDTO>> GetDanhSachPhatByUserId(Guid userId);
        Task<ResultModel> AddDanhSachphatBaiNhac(DanhSachPhatBaiNhacModal modal);

        Task<List<DanhSachPhatBaiNhacDTO>> GetDanhSachPhatBaiNhacByDanhSachPhatId(Guid danhSachPhatId);

        Task<ResultModel> DeleteDanhSachPhatBaiNhac(Guid baiNhacId, Guid danhSachPhatId);
    }
}
