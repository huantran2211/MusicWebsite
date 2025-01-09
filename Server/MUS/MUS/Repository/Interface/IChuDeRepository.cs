using MUS.Entities.DTO;
using MUS.Model;

namespace MUS.Repository.Interface
{
    public interface IChuDeRepository
    {
        public Task<ResultModel> AddChuDe(ChuDeModal modal);

        public Task<List<ChuDeDTO>> GetAllChuDe();

        public Task<ChuDeDTO> GetChuDeById(Guid id);

        public Task<ResultModel> UpdateChuDe(ChuDeModal modal);

        public Task<ResultModel> DeleteChuDe(Guid id);
    }
}
