using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MUS.Entities;
using MUS.Entities.DTO;
using MUS.Model;
using MUS.Repository.Interface;

namespace MUS.Repository
{
    public class DanhSachPhatRepository : IDanhSachPhatRepository
    {
        private readonly MusDbConText _musDbConText;
        private readonly IMapper _mapper;
        public DanhSachPhatRepository(MusDbConText conText , IMapper mapper)
        {
            _musDbConText = conText;
            _mapper = mapper;
        }
        public async  Task<ResultModel> AddDanhSachPhat(danhSachPhatModal modal)
        {
           var db = _musDbConText.DanhSachPhats.FirstOrDefault( r=> r.Id == modal.Id);
            try
            {
                if (db == null)
                {
                    DanhSachPhat danhSachPhat = new DanhSachPhat();
                    danhSachPhat.Id = Guid.NewGuid();
                    danhSachPhat.TenDanhSachPhat = modal.TenDanhSachPhat;
                    danhSachPhat.NgayPhatHanh = modal.NgayPhatHanh;
                    danhSachPhat.UserId = modal.UserId;

                    _musDbConText.DanhSachPhats.Add(danhSachPhat);
                    await _musDbConText.SaveChangesAsync();

                    return new ResultModel() { Status = 200, Message = "Thêm mới thành công", Success = true };
                }
                return new ResultModel() { Status = 202, Message = "Dữ liệu đã tồn tại trong hệ thống", Success = false };
            }
            catch (Exception ex)
            {
                return new ResultModel() { Status = 500, Message = ex.Message, Success = false };
            }

        }


        public async Task<ResultModel> DeleteDanhSachPhat(Guid id)
        {
            var db = _musDbConText.DanhSachPhats.FirstOrDefault(r => r.Id == id);
            if (db != null)
            {
                _musDbConText.DanhSachPhats.Remove(db);
                await _musDbConText.SaveChangesAsync();
                return new ResultModel() { Status = 200, Message = "Xóa dữ liệu thành công", Success = true };
            }
            return new ResultModel() { Status = 202, Message = "Dữ liệu không tồn tại", Success = false };
        }

       
        public async Task<List<DanhSachPhatDTO>> GetAllDanhSachPhat()
        {
           var db = await _musDbConText.DanhSachPhats.AsNoTracking().ToListAsync();
            return _mapper.Map<List<DanhSachPhatDTO>>(db);
        }

       
        public async Task<DanhSachPhatDTO> GetDanhSachPhatById(Guid id)
        {
            var db = await _musDbConText.DanhSachPhats.FirstOrDefaultAsync(r => r.Id == id);
            return _mapper.Map<DanhSachPhatDTO>(db);
        }

        public async Task<List<DanhSachPhatDTO>> GetDanhSachPhatByUserId(Guid userId)
        {
            var db = await _musDbConText.DanhSachPhats.Where(r=> r.UserId == userId).AsNoTracking().ToListAsync();
            return _mapper.Map<List<DanhSachPhatDTO>>(db);
        }

        public async Task<ResultModel> UpdateDanhSachPhat(danhSachPhatModal modal)
        {
            var db = _musDbConText.DanhSachPhats.FirstOrDefault(r => r.Id == modal.Id);
            if(db != null)
            {
                db.TenDanhSachPhat = modal.TenDanhSachPhat;

                _musDbConText.DanhSachPhats.Update(db);
                await _musDbConText.SaveChangesAsync();
                return new ResultModel() { Status = 200, Message = "Chỉnh sửa dữ liệu thành công", Success = true };
            }
            return new ResultModel() { Status = 202, Message = "Không tìm thấy dữ liệu", Success = false };
        }
        public async Task<ResultModel> AddDanhSachphatBaiNhac(DanhSachPhatBaiNhacModal modal)
        {
            var db = _musDbConText.DanhSachPhat_BaiNhac.FirstOrDefault(r=> r.BaiNhacId == modal.BaiNhacId  && r.DanhSachPhatId == modal.DanhSachPhatId);
            try
            {
                if (db == null)
                {
                    DanhSachPhat_BaiNhac item = new DanhSachPhat_BaiNhac();
                    item.DanhSachPhatId = modal.DanhSachPhatId;
                    item.BaiNhacId = modal.BaiNhacId;
                    _musDbConText.DanhSachPhat_BaiNhac.Add(item);
                    await _musDbConText.SaveChangesAsync();
                    return new ResultModel() { Status = 200, Message = "Thêm mới thành công", Success = true };
                }
                return new ResultModel() { Status = 202, Message = "Bài nhạc đã tồn tại trong danh sách phát", Success = false };
            }
            catch(Exception ex)
            {
                return new ResultModel() { Status = 500, Message =ex.Message, Success = false };
            }
           
        }
      
        public async Task<List<DanhSachPhatBaiNhacDTO>> GetDanhSachPhatBaiNhacByDanhSachPhatId(Guid danhSachPhatId)
        {
            var db = await _musDbConText.DanhSachPhat_BaiNhac.Where(r => r.DanhSachPhatId == danhSachPhatId).Include(r=> r.BaiNhac).AsNoTracking().ToListAsync();
            return _mapper.Map<List<DanhSachPhatBaiNhacDTO>>(db);
        }
        public async Task<ResultModel> DeleteDanhSachPhatBaiNhac(Guid baiNhacId, Guid danhSachPhatId)
        {
            var db = _musDbConText.DanhSachPhat_BaiNhac.FirstOrDefault(r=> r.DanhSachPhatId == danhSachPhatId && r.BaiNhacId == baiNhacId);
            if(db!= null)
            {
                _musDbConText.DanhSachPhat_BaiNhac.Remove(db);
                await _musDbConText.SaveChangesAsync();
                return new ResultModel() { Status = 200, Message = "Xóa dữ liệu thành công", Success = true };
            }
            return new ResultModel() { Status = 202, Message = "Không tìm thấy dữ liệu ", Success = true };
        }

    }
}
