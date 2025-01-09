using MUS.Entities.DTO;
using MUS.Model;
using MUS.Repository.Interface;
using MUS.Services.Interface;

namespace MUS.Services
{
    public class TamTrangServices : ITamTrangServices
    {
        private readonly ITamTrangRepository _tamTrangRepository;

        public TamTrangServices(ITamTrangRepository tamTrangRepository)
        {
            _tamTrangRepository = tamTrangRepository;
        }

        public async Task<ResultModel> AddTamTrang(TamTrangModal modal)
        {
            return await _tamTrangRepository.AddTamTrang(modal);
        }

        public async Task<ResultModel> DeleteTamTrang(Guid id)
        {
            return await _tamTrangRepository.DeleteTamTrang(id);
        }

        public async Task<List<TamTrangDTO>> GetAllTamTrang()
        {
           return await _tamTrangRepository.GetAllTamTrang();
        }

        public async Task<TamTrangDTO> GetTamTrangById(Guid id)
        {
            return await _tamTrangRepository.GetTamTrangById(id);
        }

        public async Task<ResultModel> UpdateTamTrang(TamTrangModal modal)
        {
            return await _tamTrangRepository.UpdateTamTrang(modal);
        }
    }
}
