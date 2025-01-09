using MUS.Entities.DTO;
using MUS.Model;
using MUS.Repository.Interface;
using MUS.Services.Interface;

namespace MUS.Services
{
    public class DanhSachPhatServices : IDanhSachPhatServices
    {
        private readonly IDanhSachPhatRepository _danhSachPhatRepository;
        public DanhSachPhatServices(IDanhSachPhatRepository danhSachPhatRepository)
        {
            _danhSachPhatRepository = danhSachPhatRepository;
        }
        public async Task<ResultModel> AddDanhSachPhat(danhSachPhatModal modal)
        {
            return await _danhSachPhatRepository.AddDanhSachPhat(modal);
        }

        public async Task<ResultModel> DeleteDanhSachPhat(Guid id)
        {
            return await _danhSachPhatRepository.DeleteDanhSachPhat(id);
        }

     
        public async Task<List<DanhSachPhatDTO>> GetAllDanhSachPhat()
        {
            return await _danhSachPhatRepository.GetAllDanhSachPhat();
        }

      

        public async Task<DanhSachPhatDTO> GetDanhSachPhatById(Guid id)
        {
            return await _danhSachPhatRepository.GetDanhSachPhatById(id);
        }

        public async Task<List<DanhSachPhatDTO>> GetDanhSachPhatByUserId(Guid userId)
        {
            return await _danhSachPhatRepository.GetDanhSachPhatByUserId(userId);
        }

        public async Task<ResultModel> UpdateDanhSachPhat(danhSachPhatModal id)
        {
            return await _danhSachPhatRepository.UpdateDanhSachPhat(id);
        }

        public async Task<ResultModel> AddDanhSachphatBaiNhac(DanhSachPhatBaiNhacModal modal)
        {
            return await _danhSachPhatRepository.AddDanhSachphatBaiNhac(modal);
        }
        public async Task<ResultModel> DeleteDanhSachPhatBaiNhac(Guid baiNhacId, Guid danhSachPhatId)
        {
            return await _danhSachPhatRepository.DeleteDanhSachPhatBaiNhac(baiNhacId, danhSachPhatId);
        }

        public async Task<List<DanhSachPhatBaiNhacDTO>> GetDanhSachPhatBaiNhacByDanhSachPhatId(Guid danhSachPhatId)
        {
            return await _danhSachPhatRepository.GetDanhSachPhatBaiNhacByDanhSachPhatId(danhSachPhatId);
        }
    }

}
