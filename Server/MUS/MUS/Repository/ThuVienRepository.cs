using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MUS.Entities;
using MUS.Entities.DTO;
using MUS.Model;
using MUS.Repository.Interface;

namespace MUS.Repository
{
    public class ThuVienRepository : IThuVienRepository
    {
        private readonly MusDbConText _context;
        private readonly IMapper _mapper;
        public ThuVienRepository(MusDbConText conText , IMapper mapper) { 
            _context = conText;
            _mapper = mapper;
        }
        public async Task<ResultModel> AddThuVien(ThuVienModal modal)
        {
            var db = _context.ThuViens.FirstOrDefault(r => r.Id == modal.Id);
            if (db == null)
            {
                ThuVien thuVien = new ThuVien();
                thuVien.Id = Guid.NewGuid();
                thuVien.NguoiDungId = modal.NguoiDungId;
                _context.ThuViens.Add(thuVien);
                await _context.SaveChangesAsync();
                return new ResultModel() { Status= 200 , Message ="Thêm mới thành công" , Success= false};
            }

            return new ResultModel() { Status = 202, Message = "Thư viện đã tồn tại trong hệ thống", Success = false };
        }

        public async Task<ResultModel> AddThuVienBaiNahc(ThuVienBaiNhacModal modal)
        {
            var db = _context.ThuVienBaiNhacs.FirstOrDefault( r=> r.ThuVienId == modal.BaiNhacId && r.BaiNhacId ==  modal.BaiNhacId );
            if (db == null)
            {
                ThuVienBaiNhac thuVienBaiNhac = new ThuVienBaiNhac();
                thuVienBaiNhac.ThuVienId = modal.ThuVienId;
                thuVienBaiNhac.BaiNhacId = modal.BaiNhacId;
                _context.ThuVienBaiNhacs.Add(thuVienBaiNhac);
                await _context.SaveChangesAsync();
                return new ResultModel() { Status = 200, Message = "Thêm vào thư viện thành công", Success = true };
            }
            return new ResultModel() { Status = 202, Message = "Bài hát đã tồn tại trong thư viện ", Success = false };
        }

        public async Task<ResultModel> DeleteThuVienBaiNhac(Guid ThuVienId, Guid BaiNhacId)
        {
            var db = _context.ThuVienBaiNhacs.FirstOrDefault( r=> r.ThuVienId == ThuVienId && r.BaiNhacId ==BaiNhacId );
            if ( db != null)
            {
                _context.ThuVienBaiNhacs.Remove(db);
                await _context.SaveChangesAsync();
                return new ResultModel() { Status = 200  , Message ="Xóa bài nhạc khỏi thư viện thành công" , Success = true };
            }    
            else
            {
                return new ResultModel() { Status = 202, Message = "Không tìm thấy dữ liệu", Success = false };
            }    
        }

        public async Task<List<ThuVienDTO>> GetAllThuVien()
        {
            var db = await _context.ThuViens.AsNoTracking().ToListAsync();
            return _mapper.Map<List<ThuVienDTO>>(db);
        }

        public async Task<List<ThuVienBaiNhacDTO>> GetThuVienBaiNhacByThuVienId(Guid Id)
        {
            var db =await _context.ThuVienBaiNhacs.Where(r => r.ThuVienId == Id).Include(r => r.BaiNhac).ThenInclude(r=>r.NhacSi).ToListAsync();
            return _mapper.Map<List<ThuVienBaiNhacDTO>>(db);
        }

        public async Task<ThuVienDTO> GetThuVienByUserId(Guid UserId)
        {
            var db = await _context.ThuViens.FirstOrDefaultAsync(r => r.NguoiDungId == UserId);
            return _mapper.Map<ThuVienDTO>(db);
        }
    }
}
