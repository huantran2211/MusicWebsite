using MUS.Entities.DTO;
using MUS.Model;
using MUS.Repository;
using MUS.Repository.Interface;
using MUS.Services.Interface;

namespace MUS.Services
{
    public class LichSuNgheNhacServices : ILichSuNgheNhacServices
    {
        private readonly ILichSuNGheNhacRepository _lichSuNgheNhacRepository;
        public LichSuNgheNhacServices(ILichSuNGheNhacRepository lichSuNGheNhacRepository)
        {
            _lichSuNgheNhacRepository = lichSuNGheNhacRepository;
        }
        public async Task<ResultModel> AddLichSuNGheNhac(LichSuNgheNhacModel modal)
        {
            return await _lichSuNgheNhacRepository.AddLichSuNGheNhac(modal);
        }

        public async Task<ResultModel> DeleteLichSuNgheNhac(Guid id)
        {
            return await _lichSuNgheNhacRepository.DeleteLichSuNgheNhac(id);
        }

        public async Task<List<LichSuNgheNhacDTO>> GetAllLichSu()
        {
            return await _lichSuNgheNhacRepository.GetAllLichSu();
        }

        public async Task<LichSuNgheNhacDTO> GetLichSuNgheNhacById(Guid Id)
        {
            return await _lichSuNgheNhacRepository.GetLichSuNgheNhacById(Id);
        }

        public async Task<List<LichSuNgheNhacDTO>> GetLichSuNGheNhacByUserId(Guid userId)
        {
            return await _lichSuNgheNhacRepository.GetLichSuNGheNhacByUserId(userId);
        }
    }
}
