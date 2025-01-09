using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MUS.Entities;
using MUS.Entities.DTO;
using MUS.Model;
using MUS.Repository.Interface;

namespace MUS.Repository
{
    public class LichSuNgheNhacRepository : ILichSuNGheNhacRepository
    {
        private readonly MusDbConText _musDbConText;
        private readonly IMapper _mapper;
        public LichSuNgheNhacRepository(MusDbConText musDbConText , IMapper mapper)
        {
            _musDbConText = musDbConText;
            _mapper = mapper;
        }
        public async Task<List<LichSuNgheNhacDTO>> GetAllLichSu()
        {
           var db = await _musDbConText.LichSuNgheNhacs.AsNoTracking().ToListAsync();
            return _mapper.Map<List<LichSuNgheNhacDTO>>(db);
        }

        public async Task<LichSuNgheNhacDTO> GetLichSuNgheNhacById(Guid Id)
        {
            var db = await _musDbConText.LichSuNgheNhacs.AsNoTracking().FirstOrDefaultAsync(r=> r.Id == Id);
            return _mapper.Map<LichSuNgheNhacDTO>(db);
        }

        public async Task<List<LichSuNgheNhacDTO>> GetLichSuNGheNhacByUserId(Guid userId)
        {
            var db = await _musDbConText.LichSuNgheNhacs.Where(r=> r.UserId == userId).Include(r=> r.BaiNhac).ToListAsync();
            return _mapper.Map<List<LichSuNgheNhacDTO>>(db);
        }
        public async Task<ResultModel> AddLichSuNGheNhac(LichSuNgheNhacModel modal)
        {
            var db = _musDbConText.LichSuNgheNhacs.FirstOrDefault(r => r.Id == modal.Id);
            var music = _musDbConText.LichSuNgheNhacs.FirstOrDefault(r=> r.BaiNhacId == modal.BaiNhacId && r.UserId == modal.UserId);
            try
            {
                if (db == null)
                {
                    if(music != null)
                    {
                        _musDbConText.LichSuNgheNhacs.Remove(music);
                      
                    }    
                   
                        LichSuNgheNhac lichSuNgheNhac = new LichSuNgheNhac();
                        lichSuNgheNhac.Id = Guid.NewGuid();
                        lichSuNgheNhac.NgayNghe = DateTime.Now;
                        lichSuNgheNhac.BaiNhacId = modal.BaiNhacId;
                        lichSuNgheNhac.UserId = modal.UserId;
                        lichSuNgheNhac.TheLoaiId = modal.TheLoaiId;
                        _musDbConText.LichSuNgheNhacs.Add(lichSuNgheNhac);
                        await _musDbConText.SaveChangesAsync();
                        return new ResultModel() { Status = 200, Message = "Thêm mới thành công", Success = true };
 
                  
                }
                else
                {
                    return new ResultModel() { Status = 202, Message = "Dữ liệu đã tồn tại", Success = false };
                }
            }
            catch (Exception ex)
            {
                return new ResultModel() { Status = 500, Message = ex.Message, Success = false };
            }
            
        }

        public async Task<ResultModel> DeleteLichSuNgheNhac(Guid id)
        {
            var db = _musDbConText.LichSuNgheNhacs.FirstOrDefault(r=> r.Id == id);
            if (db != null)
            {
                _musDbConText.LichSuNgheNhacs.Remove(db);
                await _musDbConText.SaveChangesAsync();
                return new ResultModel() { Status = 200, Message = "Xóa dữ liệu thành công", Success = true };
            }
            else
            {
                return new ResultModel() { Status = 202, Message = "Dữ liệu không tìm thấy", Success = true };
            }    
        }

     
    }
}
