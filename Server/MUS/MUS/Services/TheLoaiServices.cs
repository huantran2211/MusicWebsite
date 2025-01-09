using MUS.Entities.DTO;
using MUS.Model;
using MUS.Repository;
using MUS.Repository.Interface;
using MUS.Services.Interface;

namespace MUS.Services
{
    public class TheLoaiServices : ITheLoaiServices
    {
        private readonly ITheLoaiRepository _theLoaiRepository;
        public TheLoaiServices(ITheLoaiRepository theLoaiRepository) {
            _theLoaiRepository = theLoaiRepository;
        }
        public async  Task<ResultModel> AddTheLoai(TheLoaiModal modal)
        {
            return await _theLoaiRepository.AddTheLoai(modal);
        }

        public async Task<ResultModel> DeleteTheLoai(Guid id)
        {
            return await _theLoaiRepository.DeleteTheLoai(id);
        }

        public async Task<List<TheLoaiDTO>> GetAllTheLoai()
        {
            return await _theLoaiRepository.GetAllTheLoai();
        }

        public async Task<TheLoaiDTO> GetTheLoaiById(Guid id)
        {
            return await _theLoaiRepository.GetTheLoaiById(id);
        }

        public async Task<ResultModel> UpdateTheLoai(TheLoaiModal modal)
        {
            return await _theLoaiRepository.UpdateTheLoai(modal);
        }
    }
}
