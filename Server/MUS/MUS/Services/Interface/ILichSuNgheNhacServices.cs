using MUS.Entities.DTO;
using MUS.Model;

namespace MUS.Services.Interface
{
    public interface ILichSuNgheNhacServices
    {
        Task<List<LichSuNgheNhacDTO>> GetAllLichSu();

        Task<ResultModel> AddLichSuNGheNhac(LichSuNgheNhacModel modal);

        Task<LichSuNgheNhacDTO> GetLichSuNgheNhacById(Guid Id);

        Task<List<LichSuNgheNhacDTO>> GetLichSuNGheNhacByUserId(Guid userId);
        Task<ResultModel> DeleteLichSuNgheNhac(Guid id);
    }
}
