using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MUS.Entities;
using MUS.Entities.DTO;
using MUS.Helper;
using MUS.Model;
using MUS.Repository.Interface;

namespace MUS.Repository
{
    public class AlbumRepository : IAlbumRepository
    {
        private readonly MusDbConText _musDbConText;
        private readonly IMapper _mapper;

        public AlbumRepository( MusDbConText musDbConText, IMapper mapper)
        {
            _musDbConText = musDbConText;
            _mapper = mapper;
        }

        public async Task<ResultModel> AddAlbum(AlbumModal model)
        {
            try
            {
                var db = _musDbConText.Albums.FirstOrDefault(r => r.Id == model.Id);
                if (db == null)
                {
                    Album album = new Album();
                    album.Id = Guid.NewGuid(); ;
                    album.TenAlbum = model.TenAlbum;
                    album.NgayPhatHanh = model.NgayPhatHanh;
                    if (model.Url != null && model.Url.Length > 0)
                    {
                        var res = Untils.UploadFileImage(model.Url);
                        if (!string.IsNullOrEmpty(res))
                        {
                            album.Url = res;
                        }
                    }
                    _musDbConText.Albums.Add(album);
                    await _musDbConText.SaveChangesAsync();
                    return new ResultModel() { Status = 200, Message = "Thêm mới thành công", Success = true };
                }
                return new ResultModel() { Status = 202, Message = "Album đã tồn tại trong hệ thống", Success = true };
            }
            catch (Exception ex)
            {
                return new ResultModel() { Status = 500, Message = ex.Message, Success = false };
            }
        }

        public async Task<ResultModel> AddAlbumNhacSi(AlbumNhacSiModal modal)
        {
            var db = _musDbConText.AlbumNhacSis.FirstOrDefault(r => r.AlBumId == modal.AlbumId && r.NhacSiId == modal.NhacSiId);
            if (db == null)
            {
                AlbumNhacSi albumNhacSi = new AlbumNhacSi();
                albumNhacSi.NhacSiId = modal.NhacSiId;
                albumNhacSi.AlBumId = modal.AlbumId;
                _musDbConText.AlbumNhacSis.Add(albumNhacSi);
                await _musDbConText.SaveChangesAsync();
                return new ResultModel() { Status = 200, Message = "Thêm mới thành công", Success = true };
            }
            else
            {
                return new ResultModel() { Status = 202, Message = "Dữ liệu đã tồn tại", Success = false };
            }    
        }

        public async Task<ResultModel> DeleteAlbum(Guid id)
        {

            var db = _musDbConText.Albums.Where(r => r.Id == id).FirstOrDefault();
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
                _musDbConText.Albums.Remove(db);
                await _musDbConText.SaveChangesAsync();
                return new ResultModel() { Status = 200, Message = "Xóa thành công", Success = true };
            }
            return new ResultModel() { Status = 202, Message = "Không tìm thấy dữ liệu", Success = false };
        }

        public async Task<ResultModel> DeleteAlbumNhacSi(Guid AlbumId, Guid NhacSiId)
        {
            var db = _musDbConText.AlbumNhacSis.FirstOrDefault(r=> r.AlBumId == AlbumId && r.NhacSiId == NhacSiId);
            if(db != null)
            {
                _musDbConText.AlbumNhacSis.Remove(db);
                await _musDbConText.SaveChangesAsync();
                return new ResultModel() { Status = 200, Message = "Xóa thành công", Success = true };
            }    
            else
            {
                return new ResultModel() { Status = 202, Message = "Không tìm thấy dữ liệu", Success = false };
            }    
        }

        public  async Task<AlbumDTO> GetAlbumById(Guid id)
        {
            var db = await _musDbConText.Albums.Where(r => r.Id == id).AsNoTracking().FirstOrDefaultAsync();
            return _mapper.Map<AlbumDTO>(db);
        }

        public async Task<List<AlbumDTO>> GetAllAlbum()
        {
            var db = await _musDbConText.Albums.AsNoTracking().ToListAsync();
            return _mapper.Map<List<AlbumDTO>>(db);
        }

        public async Task<ResultModel> UpdateAlbum(AlbumModal model)
        {
            var db = _musDbConText.Albums.FirstOrDefault(r => r.Id == model.Id);
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
                    db.TenAlbum = model.TenAlbum;
                    db.NgayPhatHanh = model.NgayPhatHanh;
                    _musDbConText.Albums.Update(db);
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
