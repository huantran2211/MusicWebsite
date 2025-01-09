using MUS.Entities.DTO;
using MUS.Model;

namespace MUS.Repository.Interface
{
    public interface ITheLoaiRepository
    {
        public Task<ResultModel> AddTheLoai(TheLoaiModal modal);

        public Task<List<TheLoaiDTO>> GetAllTheLoai();

        public Task<TheLoaiDTO> GetTheLoaiById(Guid id);

        public Task<ResultModel> UpdateTheLoai(TheLoaiModal modal);

        public Task<ResultModel> DeleteTheLoai(Guid id);
    }
}
