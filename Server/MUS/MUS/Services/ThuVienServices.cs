using MUS.Entities.DTO;
using MUS.Model;
using MUS.Repository.Interface;
using MUS.Services.Interface;

namespace MUS.Services
{
    public class ThuVienServices : IThuVienServices
    {
        private readonly IThuVienRepository _thuVienRepository;

        public ThuVienServices(IThuVienRepository thuVienRepository)
        {
            _thuVienRepository = thuVienRepository;
        }
        public async Task<ResultModel> AddThuVien(ThuVienModal modal)
        {
            return await _thuVienRepository.AddThuVien(modal);
        }

        public async Task<ResultModel> AddThuVienBaiNahc(ThuVienBaiNhacModal modal)
        {
            return await _thuVienRepository.AddThuVienBaiNahc(modal);
        }

        public async Task<ResultModel> DeleteThuVienBaiNhac(Guid ThuVienId, Guid BaiNhacId)
        {
            return await _thuVienRepository.DeleteThuVienBaiNhac(ThuVienId, BaiNhacId);
        }

        public async  Task<List<ThuVienDTO>> GetAllThuVien()
        {
            return await _thuVienRepository.GetAllThuVien();
        }

        public async Task<List<ThuVienBaiNhacDTO>> GetThuVienBaiNhacByThuVienId(Guid Id)
        {
            return await _thuVienRepository.GetThuVienBaiNhacByThuVienId(Id);
        }

        public  async Task<ThuVienDTO> GetThuVienByUserId(Guid UserId)
        {
            return await _thuVienRepository.GetThuVienByUserId(UserId);
        }
    }
}
