using AutoMapper;
using Azure.Core;
using Microsoft.EntityFrameworkCore;
using MUS.Entities;
using MUS.Entities.DTO;
using MUS.Helper;
using MUS.Model;
using MUS.Repository.Interface;

namespace MUS.Repository
{
    public class TheLoaiRepository : ITheLoaiRepository
    {
        private readonly MusDbConText _musDbConText;
        private readonly IMapper _mapper;

        public TheLoaiRepository(MusDbConText conText , IMapper mapper)
        {
            _musDbConText = conText;
            _mapper = mapper;
        }

        public async Task<ResultModel> AddTheLoai(TheLoaiModal modal)
        {
            try
            {
                var db = _musDbConText.TheLoais.FirstOrDefault(r =>r.Id == modal.Id);
                if (db == null)
                {
                    TheLoai theLoai = new TheLoai();
                    theLoai.Id = Guid.NewGuid(); ;
                    theLoai.TenTheLoai = modal.TenTheLoai;
                    if (modal.File != null && modal.File.Length > 0)
                    {
                        var res = Untils.UploadFileImage(modal.File);
                        if (!string.IsNullOrEmpty(res))
                        {
                         theLoai.Url = res;
                        }    
                    }
                    _musDbConText.TheLoais.Add(theLoai);
                    await _musDbConText.SaveChangesAsync();
                    return new ResultModel() { Status = 200, Message = "Thêm mới thành công", Success = true };
                }
                return new ResultModel() { Status = 202, Message = "thể loại đã tồn tại trong hệ thống", Success = true };
            }
            catch(Exception ex)
            {
                return new ResultModel() { Status = 500, Message =ex.Message, Success = false };
            }
        }

        public async Task<ResultModel> DeleteTheLoai(Guid id)
        {
            var db = _musDbConText.TheLoais.Where(r => r.Id == id).FirstOrDefault();
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
                _musDbConText.TheLoais.Remove(db);
                await _musDbConText.SaveChangesAsync();
                return new ResultModel() { Status = 200, Message ="Xóa thành công", Success = true };
            }
            return new ResultModel() { Status = 202, Message = "Không tìm thấy dữ liệu", Success = false };
        }

        public async Task<List<TheLoaiDTO>> GetAllTheLoai()
        {
            var db =await _musDbConText.TheLoais.AsNoTracking().ToListAsync();
            return _mapper.Map<List<TheLoaiDTO>>(db);
        }

        public async Task<TheLoaiDTO> GetTheLoaiById(Guid id)
        {
            var db = await _musDbConText.TheLoais.Where(r => r.Id == id).AsNoTracking().FirstOrDefaultAsync();
            return  _mapper.Map<TheLoaiDTO>(db);         
        }

        public async Task<ResultModel> UpdateTheLoai(TheLoaiModal modal)
        {
            var db = _musDbConText.TheLoais.FirstOrDefault(r=> r.Id == modal.Id);
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
                    db.TenTheLoai = modal.TenTheLoai;
                    _musDbConText.TheLoais.Update(db);
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
