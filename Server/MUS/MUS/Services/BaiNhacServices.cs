using MUS.Entities.DTO;
using MUS.Model;
using MUS.Repository.Interface;
using MUS.Services.Interface;

namespace MUS.Services
{
    public class BaiNhacServices : IBaiNhacServices
    {
        private readonly IBaiNhacRepository _baiNhacRepository;
        public BaiNhacServices(IBaiNhacRepository baiNhacRepository) {
            _baiNhacRepository = baiNhacRepository;
        }
        public async Task<ResultModel> AddBaiNhac(BaiNhacModel model)
        {
           return await _baiNhacRepository.AddBaiNhac(model);
        }

        public async Task<ResultModel> DeleteBaiNhac(Guid id)
        {
            return await _baiNhacRepository.DeleteBaiNhac(id);
        }

        public async Task<List<BaiNhacDTO>> GetAllBaiNhac()
        {
            return await _baiNhacRepository.GetAllBaiNhac();
        }

        public async Task<List<BaiNhacDTO>> GetBaiNhacByAlBumId(Guid albumId)
        {
           return await _baiNhacRepository.GetBaiNhacByAlBumId(albumId);
        }

        public async Task<List<BaiNhacDTO>> GetBaiNhacByChuDeid(Guid chuDeId)
        {
            return await _baiNhacRepository.GetBaiNhacByChuDeid(chuDeId);
        }

        public async Task<BaiNhacDTO> GetBaiNhacById(Guid id)
        {
            return await _baiNhacRepository.GetBaiNhacById(id);
        }

        public async Task<List<BaiNhacDTO>> GetBaiNhacByNhacSiId(Guid nhacSiId)
        {
            return await _baiNhacRepository.GetBaiNhacByNhacSiId(nhacSiId);
        }

        public async Task<List<BaiNhacDTO>> GetBaiNhacByQuocGiaId(int quocGiaId)
        {
          return await _baiNhacRepository.GetBaiNhacByQuocGiaId(quocGiaId);
        }

        public async Task<List<BaiNhacDTO>> GetBaiNhacByTamTrangid(Guid tamTrangId)
        {
            return await _baiNhacRepository.GetBaiNhacByTamTrangid(tamTrangId);
        }

        public async Task<List<BaiNhacDTO>> GetBainhacByTheLoaiId(Guid theLoaiId)
        {
            return await _baiNhacRepository.GetBainhacByTheLoaiId(theLoaiId);
        }

        public async Task<List<BaiNhacDTO>> GetTop100BaiNhacNgheNhieuNhat()
        {
            return await _baiNhacRepository.GetTop100BaiNhacNgheNhieuNhat();
        }

        public async Task<List<BaiNhacDTO>> GetTop5BaiNhacMoiPhatHanh()
        {
           return await _baiNhacRepository.GetTop5BaiNhacMoiPhatHanh();
        }

        public async Task<List<BaiNhacDTO>> GetTop5BaiNhacNhieuLuotXem()
        {
            return await _baiNhacRepository.GetTop5BaiNhacNhieuLuotXem();
        }

        public async Task<List<BaiNhacDTO>> GoiYbaiNhacByUserId(Guid userId)
        {
            return await _baiNhacRepository.GoiYbaiNhacByUserId(userId);
        }

        public async Task<List<BaiNhacDTO>> TimKiemBaiHat(string keyword)
        {
            return await _baiNhacRepository.TimKiemBaiHat(keyword);
        }

        public async Task<ResultModel> UpdateBaiNhac(UpdateBaiNhacModel model)
        {
            return await _baiNhacRepository.UpdateBaiNhac(model);
        }

        public async Task<ResultModel> UpdateView(Guid id)
        {
           return await _baiNhacRepository.UpdateView(id);  
        }
    }
}
