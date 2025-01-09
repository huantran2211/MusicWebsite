using MUS.Entities.DTO;
using MUS.Model;

namespace MUS.Repository.Interface
{
    public interface ITamTrangRepository
    {
         Task<ResultModel> AddTamTrang(TamTrangModal modal);

         Task<List<TamTrangDTO>> GetAllTamTrang();

         Task<TamTrangDTO> GetTamTrangById(Guid id);

         Task<ResultModel> UpdateTamTrang(TamTrangModal modal);

         Task<ResultModel> DeleteTamTrang(Guid id);
    }
}
