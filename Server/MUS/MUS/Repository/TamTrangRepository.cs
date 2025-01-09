using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MUS.Entities;
using MUS.Entities.DTO;
using MUS.Helper;
using MUS.Model;
using MUS.Repository.Interface;

namespace MUS.Repository
{
    public class TamTrangRepository : ITamTrangRepository
    {
        private readonly MusDbConText _musDbConText;
        private readonly IMapper _mapper;

        public TamTrangRepository(MusDbConText conText , IMapper mapper)
        {
            _musDbConText = conText;
            _mapper = mapper;
        }

        public async Task<ResultModel> AddTamTrang(TamTrangModal modal)
        {
            try
            {
                var db = _musDbConText.TamTrangs.FirstOrDefault(r => r.Id == modal.Id);
                if (db == null)
                {
                    TamTrang tamTrang = new TamTrang();
                    tamTrang.Id = Guid.NewGuid(); ;
                    tamTrang.TenTamTrang = modal.TenTamTrang;
                    if (modal.Url != null && modal.Url.Length > 0)
                    {
                        var res = Untils.UploadFileImage(modal.Url);
                        if (!string.IsNullOrEmpty(res))
                        {
                            tamTrang.Url = res;
                        }
                    }
                    _musDbConText.TamTrangs.Add(tamTrang);
                    await _musDbConText.SaveChangesAsync();
                    return new ResultModel() { Status = 200, Message = "Thêm mới thành công", Success = true };
                }
                return new ResultModel() { Status = 202, Message = "Dữ liệu đã tồn tại trong hệ thống", Success = true };
            }
            catch (Exception ex)
            {
                return new ResultModel() { Status = 500, Message = ex.Message, Success = false };
            }
        }

        public async Task<ResultModel> DeleteTamTrang(Guid id)
        {
            var db = _musDbConText.TamTrangs.Where(r => r.Id == id).FirstOrDefault();
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
                _musDbConText.TamTrangs.Remove(db);
                await _musDbConText.SaveChangesAsync();
                return new ResultModel() { Status = 200, Message = "Xóa thành công", Success = true };
            }
            return new ResultModel() { Status = 202, Message = "Không tìm thấy dữ liệu", Success = false };
        }

        public async Task<List<TamTrangDTO>> GetAllTamTrang()
        {
            var db = await _musDbConText.TamTrangs.AsNoTracking().ToListAsync();
            return _mapper.Map<List<TamTrangDTO>>(db);
        }

        public async Task<TamTrangDTO> GetTamTrangById(Guid id)
        {
            var db = await _musDbConText.TamTrangs.Where(r => r.Id == id).AsNoTracking().FirstOrDefaultAsync();
            return _mapper.Map<TamTrangDTO>(db);
        }

        public async Task<ResultModel> UpdateTamTrang(TamTrangModal modal)
        {
            var db = _musDbConText.TamTrangs.FirstOrDefault(r => r.Id == modal.Id);
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
                    var res = Untils.UploadFileImage(modal.Url!);
                    if (!string.IsNullOrEmpty(res))
                        url = res;
                    db.TenTamTrang = modal.TenTamTrang;
                    _musDbConText.TamTrangs.Update(db);
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
