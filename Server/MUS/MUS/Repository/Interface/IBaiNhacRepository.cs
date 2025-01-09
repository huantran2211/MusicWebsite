using MUS.Entities.DTO;
using MUS.Model;

namespace MUS.Repository.Interface
{
    public interface IBaiNhacRepository
    {
         Task<ResultModel> AddBaiNhac(BaiNhacModel model);

         Task<List<BaiNhacDTO>> GetAllBaiNhac();

         Task<BaiNhacDTO> GetBaiNhacById(Guid id);

         Task<ResultModel> UpdateBaiNhac(UpdateBaiNhacModel model);

         Task<ResultModel> DeleteBaiNhac(Guid id);

         Task<ResultModel> UpdateView(Guid id);

         Task<List<BaiNhacDTO>> GetTop5BaiNhacNhieuLuotXem();
        Task<List<BaiNhacDTO>> GetTop5BaiNhacMoiPhatHanh();


        Task<List<BaiNhacDTO>> GetBaiNhacByNhacSiId(Guid nhacSiId);
        Task<List<BaiNhacDTO>> GetBainhacByTheLoaiId(Guid theLoaiId);
        Task<List<BaiNhacDTO>> GetBaiNhacByTamTrangid(Guid tamTrangId);
        Task<List<BaiNhacDTO>> GetBaiNhacByChuDeid(Guid chuDeId);
        Task<List<BaiNhacDTO>> GetBaiNhacByAlBumId(Guid albumId);
        Task<List<BaiNhacDTO>> GetBaiNhacByQuocGiaId(int quocGiaId);

        Task<List<BaiNhacDTO>> GoiYbaiNhacByUserId(Guid userId);

        Task<List<BaiNhacDTO>> GetTop100BaiNhacNgheNhieuNhat();

        Task<List<BaiNhacDTO>> TimKiemBaiHat(string keyword);
    }
}
