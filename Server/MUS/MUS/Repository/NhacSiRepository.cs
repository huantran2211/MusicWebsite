using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MUS.Entities;
using MUS.Entities.DTO;
using MUS.Helper;
using MUS.Model;
using MUS.Repository.Interface;

namespace MUS.Repository
{
    public class NhacSiRepository : INhacsiRepository
    {
        private readonly MusDbConText _musDbConText;
        private readonly IMapper _mapper;
        public NhacSiRepository(MusDbConText musDbConText , IMapper mapper) {
            _musDbConText = musDbConText;
            _mapper = mapper;   
        }
        public async Task<ResultModel> AddNhacSi(NhacsiModel model)
        {
            var db = _musDbConText.NhacSis.FirstOrDefault(r=> r.Id == model.Id);
            try
            {
                if (db == null)
                {
                    NhacSi nhacSi = new NhacSi();
                    nhacSi.Id = Guid.NewGuid();
                    nhacSi.TenNhacSi = model.TenNhacSi;
                    nhacSi.NickName = model.NickName;
                    if (model.Url != null && model.Url.Length > 0)
                    {
                        var res = Untils.UploadFileImage(model.Url);
                        if (!string.IsNullOrEmpty(res))
                        {
                            nhacSi.Url = res;
                        }
                    }
                    _musDbConText.NhacSis.Add(nhacSi);
                    await _musDbConText.SaveChangesAsync();
                    return new ResultModel() { Status = 200, Message = "Thêm nhạc sĩ thành công", Success = true };
                }
                else
                {
                    return new ResultModel() { Status = 202, Message = "Nhạc sĩ đã tồn tại trong hệ thống", Success = false };
                }
            }
            catch (Exception ex)
            {
                return new ResultModel() { Status = 500, Message = ex.Message, Success = false };
            }
        }

        public async Task<ResultModel> DeleteNhacSi(Guid id)
        {
           var db =  _musDbConText.NhacSis.FirstOrDefault(r => r.Id == id);
            if(db != null)
            {
                if (!string.IsNullOrEmpty(db.Url))
                {
                    try
                    {
                        var deletefile = Untils.DeleteFile(db.Url!);
                    }
                    catch { }
                }
                _musDbConText.NhacSis.Remove(db);
                await _musDbConText.SaveChangesAsync();
                return new ResultModel() { Status = 200, Message = "Xóa thành công ", Success = true };
            }
            return new ResultModel() { Status = 202, Message = "Không tìm thấy dữ liệu", Success = false };
        }

        public async Task<List<NhacSiDTO>> GetAllNhacSi()
        {
            var db = await _musDbConText.NhacSis.AsNoTracking().ToListAsync();
            return _mapper.Map<List<NhacSiDTO>>(db);
        }

        public async Task<NhacSiDTO> GetNhacSiById(Guid id)
        {
            var db = await _musDbConText.NhacSis.Where(r => r.Id == id).AsNoTracking().FirstOrDefaultAsync();
                return _mapper.Map<NhacSiDTO>(db);
        }

        public async Task<ResultModel> UpdateNhacSi(NhacsiModel model)
        {
            var db = _musDbConText.NhacSis.FirstOrDefault(r => r.Id ==model.Id);
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
                    var res = Untils.UploadFileImage(model.Url!);
                    if (!string.IsNullOrEmpty(res))
                        url = res;
                    db.TenNhacSi = model.TenNhacSi;
                    db.NickName = model.NickName;

                    _musDbConText.NhacSis.Update(db);
                    await _musDbConText.SaveChangesAsync();

                    return new ResultModel() { Status = 200, Message = "Chỉnh sửa thành công", Success = true };
                }
                return new ResultModel() { Status = 202, Message = "Không tìm thấy dữ liệu", Success = false };
            }
            catch(Exception ex)
            {
                return new ResultModel() { Status = 500, Message = ex.Message, Success = false };
            }
           
        }
    }
}
