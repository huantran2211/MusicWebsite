using MUS.Entities.DTO;

namespace MUS.Repository.Interface
{
    public interface IQuocGiaRepository
    {
        Task<List<QuocGiaDTO>> GetAllQuocGia();
    }
}
