using Microsoft.AspNetCore.Http.HttpResults;
using MUS.Entities.DTO;
using MUS.Model;

namespace MUS.Repository.Interface
{
    public interface INhacsiRepository
    {
        public Task<ResultModel> AddNhacSi(NhacsiModel model);

        public Task<List<NhacSiDTO>> GetAllNhacSi();

        public Task<NhacSiDTO> GetNhacSiById(Guid id);

        public Task<ResultModel> UpdateNhacSi(NhacsiModel model);

        public Task<ResultModel> DeleteNhacSi(Guid id);
    }
}
