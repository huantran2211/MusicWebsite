using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MUS.Entities;
using MUS.Entities.DTO;
using MUS.Helper;
using MUS.Model;
using MUS.Repository.Interface;

namespace MUS.Repository
{
    public class ChuDeRepository : IChuDeRepository
    {
        private readonly MusDbConText _musDbConText;
        private readonly IMapper _mapper;

        public ChuDeRepository(MusDbConText conText, IMapper mapper)
        {
            _musDbConText = conText;
            _mapper = mapper;
        }
        public async Task<ResultModel> AddChuDe(ChuDeModal modal)
        {
            try
            {
                var db = _musDbConText.ChuDes.FirstOrDefault(r => r.Id == modal.Id);
                if (db == null)
                {
                    ChuDe chuDe = new ChuDe(); 
                    chuDe.Id = Guid.NewGuid(); ;
                    chuDe.TenChuDe = modal.TenChuDe;
                    if (modal.File != null && modal.File.Length > 0)
                    {
                        var res = Untils.UploadFileImage(modal.File);
                        if (!string.IsNullOrEmpty(res))
                        {
                            chuDe.Url = res;
                        }
                    }
                    _musDbConText.ChuDes.Add(chuDe);
                    await _musDbConText.SaveChangesAsync();
                    return new ResultModel() { Status = 200, Message = "Thêm mới thành công", Success = true };
                }
                return new ResultModel() { Status = 202, Message = "Chủ đề đã tồn tại trong hệ thống", Success = true };
            }
            catch (Exception ex)
            {
                return new ResultModel() { Status = 500, Message = ex.Message, Success = false };
            }
        }

        public async Task<ResultModel> DeleteChuDe(Guid id)
        {
            var db = _musDbConText.ChuDes.Where(r => r.Id == id).FirstOrDefault();
            if (db != null)
            {
                if (!string.IsNullOrEmpty(db.Url))
                {
                    try
                    {
                        var deletefile = Untils.DeleteFile(db.Url!);
                    }
                    catch { }
                }
                _musDbConText.ChuDes.Remove(db);
                await _musDbConText.SaveChangesAsync();
                return new ResultModel() { Status = 200, Message = "Xóa thành công", Success = true };
            }
            return new ResultModel() { Status = 202, Message = "Không tìm thấy dữ liệu", Success = false };
        }

        public async Task<List<ChuDeDTO>> GetAllChuDe()
        {
            var db = await _musDbConText.ChuDes.AsNoTracking().ToListAsync();
            return _mapper.Map<List<ChuDeDTO>>(db);
        }

        public async Task<ChuDeDTO> GetChuDeById(Guid id)
        {
            var db = await _musDbConText.ChuDes.Where(r => r.Id == id).AsNoTracking().FirstOrDefaultAsync();
            return _mapper.Map<ChuDeDTO>(db);
        }

        public async Task<ResultModel> UpdateChuDe(ChuDeModal modal)
        {
            var db = _musDbConText.ChuDes.FirstOrDefault(r => r.Id == modal.Id);
            try
            {
                if (db != null)
                {
                    string url = db.Url!;
                    if (!string.IsNullOrEmpty(db.Url))
                    {
                        try
                        {
                            Untils.DeleteFile(db.Url!);
                        }
                        catch { }
                    }
                    var res = Untils.UploadFileImage(modal.File!);
                    if (!string.IsNullOrEmpty(res))
                        url = res;
                    db.TenChuDe = modal.TenChuDe;
                    _musDbConText.ChuDes.Update(db);
                    await _musDbConText.SaveChangesAsync();
                    return new ResultModel() { Status = 200, Message = "Chỉnh sửa thành công", Success = true };
                }
                return new ResultModel() { Status = 202, Message = "Không tìm thấy dữ liệu", Success = false };
            }
            catch (Exception ex)
            {
                return new ResultModel() { Status = 500, Message = ex.Message, Success = false };
            }
        }
    }
}
