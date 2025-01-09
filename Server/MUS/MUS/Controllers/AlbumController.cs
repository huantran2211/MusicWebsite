using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MUS.Entities.DTO;
using MUS.Model;
using MUS.Services;
using MUS.Services.Interface;

namespace MUS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlbumController : ControllerBase
    {
        public readonly IAlbumServices _albumServices;
        public AlbumController(IAlbumServices albumServices ) {
            _albumServices = albumServices;
        }
        [HttpGet("getallalbum")]
        public async Task<IActionResult> GetAllAlbum()
        {
            try
            {
                List<AlbumDTO> result = await _albumServices.GetAllAlbum();
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getalbumbyid")]
        public async Task<IActionResult> GetAlbumById(Guid Id)
        {
            try
            {
                AlbumDTO result = await _albumServices.GetAlbumById(Id);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("addalbum")]
        public async Task<IActionResult> AddAlbum([FromForm] AlbumModal modal)
        {
            try
            {
                ResultModel result = await _albumServices.AddAlbum(modal);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("addalbumnhacsi")]
        public async Task<IActionResult> AddAlbumNhacSi([FromForm] AlbumNhacSiModal modal)
        {
            try
            {
                ResultModel result = await _albumServices.AddAlbumNhacSi(modal);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("updateAlbum")]
        public async Task<IActionResult> UpdateAlbum([FromForm] AlbumModal modal)
        {
            try
            {
                ResultModel result = await _albumServices.UpdateAlbum(modal);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("deleteAlbum")]
        public async Task<IActionResult> DeleteAlbum(Guid id)
        {
            try
            {
                ResultModel result = await _albumServices.DeleteAlbum(id);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("deleteAlbumNhacSi")]
        public async Task<IActionResult> DeleteAlbumNhacSi (Guid albumId , Guid nhacSiId)
        {
            try
            {
                ResultModel result = await _albumServices.DeleteAlbumNhacSi(albumId , nhacSiId);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
