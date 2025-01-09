using MUS.Entities.DTO;
using MUS.Model;

namespace MUS.Services.Interface
{
    public interface INhacsiServices
    {
        Task<ResultModel> AddNhacSi(NhacsiModel model);

        Task<List<NhacSiDTO>> GetAllNhacSi();

         Task<NhacSiDTO> GetNhacSiById(Guid id);

        Task<ResultModel> UpdateNhacSi(NhacsiModel model);

        Task<ResultModel> DeleteNhacSi(Guid id);
    }
}
