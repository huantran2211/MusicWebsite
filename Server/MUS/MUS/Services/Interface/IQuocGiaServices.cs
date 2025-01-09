using MUS.Entities.DTO;

namespace MUS.Services.Interface
{
    public interface IQuocGiaServices
    {
        Task<List<QuocGiaDTO>> GetAllQuocGia();
    }
}
