using MUS.Entities.DTO;
using MUS.Model;
using MUS.Repository.Interface;
using MUS.Services.Interface;

namespace MUS.Services
{
    public class ChuDeServices : IChudeServices
    {
        private readonly IChuDeRepository _chuDeRepository;

        public ChuDeServices(IChuDeRepository chuDeRepository)
        {
            _chuDeRepository = chuDeRepository;
        }
        public async Task<ResultModel> AddChuDe(ChuDeModal modal)
        {
            return await _chuDeRepository.AddChuDe(modal);
        }

        public async Task<ResultModel> DeleteChuDe(Guid id)
        {
            return await _chuDeRepository.DeleteChuDe(id);
        }

        public async Task<List<ChuDeDTO>> GetAllChuDe()
        {
            return await _chuDeRepository.GetAllChuDe();
        }

        public async Task<ChuDeDTO> GetChuDeById(Guid id)
        {
            return await _chuDeRepository.GetChuDeById(id);
        }

        public async Task<ResultModel> UpdateChuDe(ChuDeModal modal)
        {
            return await _chuDeRepository.UpdateChuDe(modal);
        }
    }
}
