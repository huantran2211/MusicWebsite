using MUS.Entities.DTO;
using MUS.Model;
using MUS.Repository.Interface;
using MUS.Services.Interface;

namespace MUS.Services
{
    public class NhacsiServices : INhacsiServices
    {
        private readonly INhacsiRepository _nhacsiRepository;

        public NhacsiServices(INhacsiRepository nhacsiRepository) {
            _nhacsiRepository = nhacsiRepository;
        }

        public async Task<ResultModel> AddNhacSi(NhacsiModel model)
        {
            return await _nhacsiRepository.AddNhacSi(model);
         
        }

        public async Task<ResultModel> DeleteNhacSi(Guid id)
        {
           return await _nhacsiRepository.DeleteNhacSi(id);
        }

        public async Task<List<NhacSiDTO>> GetAllNhacSi()
        {
            return await _nhacsiRepository.GetAllNhacSi();
        }

        public async Task<NhacSiDTO> GetNhacSiById(Guid id)
        {
            return await _nhacsiRepository.GetNhacSiById(id);
        }

        public async Task<ResultModel> UpdateNhacSi(NhacsiModel model)
        {
            return await _nhacsiRepository.UpdateNhacSi(model);
        }
    }
}
