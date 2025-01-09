using MUS.Entities.DTO;
using MUS.Model;

namespace MUS.Services.Interface
{
    public interface ITamTrangServices
    {
        Task<ResultModel> AddTamTrang(TamTrangModal modal);

        Task<List<TamTrangDTO>> GetAllTamTrang();

        Task<TamTrangDTO> GetTamTrangById(Guid id);

        Task<ResultModel> UpdateTamTrang(TamTrangModal modal);

        Task<ResultModel> DeleteTamTrang(Guid id);
    }
}
