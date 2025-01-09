using MUS.Entities.DTO;
using MUS.Model;

namespace MUS.Services.Interface
{
    public interface ITheLoaiServices
    {
         Task<List<TheLoaiDTO>> GetAllTheLoai();

         Task<TheLoaiDTO> GetTheLoaiById(Guid id);
         Task<ResultModel> AddTheLoai(TheLoaiModal modal);

         Task<ResultModel> UpdateTheLoai(TheLoaiModal modal);

        Task<ResultModel> DeleteTheLoai(Guid id);
    }
}
