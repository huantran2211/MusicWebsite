using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MUS.Entities;
using MUS.Entities.DTO;
using MUS.Repository.Interface;

namespace MUS.Repository
{
    public class QuocGiaRepository : IQuocGiaRepository
    {
        private readonly MusDbConText _musDbConText;
        private readonly IMapper _mapper;
        public QuocGiaRepository(MusDbConText musDbConText, IMapper mapper)
        {
            _musDbConText = musDbConText;
            _mapper = mapper;
        }

        public async Task<List<QuocGiaDTO>> GetAllQuocGia()
        {
            var db = await _musDbConText.QuocGias.AsNoTracking().ToListAsync();
            return _mapper.Map<List<QuocGiaDTO>>(db);
        }
    }
}
