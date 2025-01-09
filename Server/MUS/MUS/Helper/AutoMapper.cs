using AutoMapper;
using MUS.Entities;
using MUS.Entities.DTO;

namespace MUS.Helper
{
    public class AutoMapper :Profile
    {
       public AutoMapper() {
            CreateMap<TheLoai, TheLoaiDTO>();
            CreateMap<ChuDe, ChuDeDTO>();
            CreateMap<BaiNhac, BaiNhacDTO>();
            CreateMap<NhacSi, NhacSiDTO>();
            CreateMap<TamTrang, TamTrangDTO>();
            CreateMap<User, LoginDTO>();
            CreateMap<User, UserDTO>();
            CreateMap<Album, AlbumDTO>();
            CreateMap<QuocGia, QuocGiaDTO>();
            CreateMap<LichSuNgheNhac, LichSuNgheNhacDTO>();
            CreateMap<DanhSachPhat, DanhSachPhatDTO>();
            CreateMap<DanhSachPhat_BaiNhac, DanhSachPhatBaiNhacDTO>();
            CreateMap<ThuVien, ThuVienDTO>();
            CreateMap<ThuVienBaiNhac, ThuVienBaiNhacDTO>();
        }
    }
    
}
