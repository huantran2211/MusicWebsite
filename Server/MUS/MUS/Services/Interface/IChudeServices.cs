using MUS.Entities.DTO;
using MUS.Model;

namespace MUS.Services.Interface
{
    public interface IChudeServices
    {
         Task<List<ChuDeDTO>> GetAllChuDe();

        Task<ChuDeDTO> GetChuDeById(Guid id);
         Task<ResultModel> AddChuDe(ChuDeModal modal);

         Task<ResultModel> UpdateChuDe(ChuDeModal modal);

        Task<ResultModel> DeleteChuDe(Guid id);
    }
}
