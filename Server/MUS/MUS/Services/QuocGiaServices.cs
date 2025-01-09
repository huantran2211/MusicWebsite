using MUS.Entities.DTO;
using MUS.Repository.Interface;
using MUS.Services.Interface;

namespace MUS.Services
{
    public class QuocGiaServices : IQuocGiaServices
    {
        private readonly IQuocGiaRepository _quocGiaRepository;
        public QuocGiaServices(IQuocGiaRepository quocGiaRepository)
        {
            _quocGiaRepository = quocGiaRepository;
        }

        public async Task<List<QuocGiaDTO>> GetAllQuocGia()
        {
            return await _quocGiaRepository.GetAllQuocGia();
        }
    }
}
