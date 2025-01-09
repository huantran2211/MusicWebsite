using MUS.Entities.DTO;
using MUS.Model;

namespace MUS.Repository.Interface
{
    public interface IAlbumRepository
    {
        Task<ResultModel> AddAlbum(AlbumModal model);

        Task<List<AlbumDTO>> GetAllAlbum();

        Task<AlbumDTO> GetAlbumById(Guid id);

        Task<ResultModel> UpdateAlbum(AlbumModal model);

        Task<ResultModel> DeleteAlbum (Guid id);

        Task<ResultModel> AddAlbumNhacSi(AlbumNhacSiModal modal);

        Task<ResultModel> DeleteAlbumNhacSi(Guid AlbumId, Guid NhacSiId); 
    }
}
